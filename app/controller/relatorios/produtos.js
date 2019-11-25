const edge = require('edge.js');
const path = require('path');
const fs = require('fs');
const {
  generateHeader,
  generateCustomerInformation,
  generateInvoiceTable,
  generateFooter
} = require('./produtoreport')
const db = require('../../models')
const PDFDocument = require("pdfkit");
const jsreport = require('jsreport')

const {
  tbl_produtos
} = require('../../models');

edge.registerViews(path.join(__dirname, '../../../app/views/relatorios'))

const invoice = {
  shipping: {
    name: "John Doe",
    address: "1234 Main Street",
    city: "San Francisco",
    state: "CA",
    country: "US",
    postal_code: 94111
  },
  items: [
    {
      item: "TC 100",
      description: "Toner Cartridge",
      quantity: 2,
      amount: 6000
    },
    {
      item: "USB_EXT",
      description: "USB Cable Extender",
      quantity: 1,
      amount: 2000
    }
  ],
  subtotal: 8000,
  paid: 0,
  invoice_nr: 1234
};

const reportproduto = async (req, res, next) => {
  let doc = new PDFDocument({ margin: 50 });

  generateHeader(doc);
  generateCustomerInformation(doc, invoice);
  generateInvoiceTable(doc, invoice);
  generateFooter(doc);

  doc.pipe(res);
  doc.end();
}

const relatoriosProdutos = async (req, res, next) => {
  tbl_produtos.findAll({
    attributes: [
      'id_produto',
      'codigo_produto',
      'nome_produto',
      'preco_unitario',
      'saldo',
      'ativo',
      'fk_produto_estoque',
      [db.sequelize.fn('date_format', db.sequelize.col('createdAt'), '%d-%m-%Y'), 'createdAt']
    ],
    where: {
      fk_produto_estoque: 1
    }
  })
    .then(async (produtos) => {
      // res.send(produtos);
      produtos['total'] = await produtos.reduce((sum, produtos) => {
        return sum + parseFloat(produtos.preco_unitario)
      }, 0)
      produtos['total'] = parseFloat(produtos.total).toFixed(2)

      return produtos
    })
    .then((produtos) => {
      return produtos
    })
    .then((produtos) => {
      res.send(edge.render('produtos', { produtos }))
    })
    .catch((error) => {
      res.render('error', { error: error })
    })
}

const jsreportPDF = async (req, res, next) => {

  let report = new jsreport();
  report.render({
    template: {
      content: '<h1>Hello world</h1>',
      engine: 'handlebars',
      recipe: 'chrone-pdf'
    }
  }).then((out)  => {
    out.stream.pipe(res);
  }).catch((e) => {
    res.end(e.message);
  });
}

module.exports = {
  relatoriosProdutos,
  reportproduto,
  jsreportPDF
}