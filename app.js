var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require('cors')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session')


// importando as rotas
var indexRouter = require('./app/routes/index');
var usersRouter = require('./app/routes/usuarios');
var fornecedoresRouter = require('./app/routes/fornecedores');
var configuracoesRouter = require('./app/routes/configuracoes');
var empresasRouter = require('./app/routes/empresas');
var estoquesRouter = require('./app/routes/estoques');
var hierarquiasRouter = require('./app/routes/hierarquias');
var categoria_produtosRouter = require('./app/routes/categoria_produtos');
var grupo_produtosRouter = require('./app/routes/grupo_produtos');
var unidade_medidasRouter = require('./app/routes/unidade_medidas');
var produtosRouter = require('./app/routes/produtos');
var notificacaoRouter = require('./app/routes/notificacao');
var movimentacaoRouter = require('./app/routes/movimentacao');
var tipoDocumentoRouter = require('./app/routes/tipo_documentos');
// Rotas dos Relatorios
var r_produtosRouter = require('./app/routes/relatorios/produtos');
// Rota de validação de token
var validarRouter = require('./app/routes/validar');

var app = express();


app.use(cors())
// Configurando sessão do usuario
app.use(session({
  secret: 'tcc-sge-2019',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: (15 * 60 * 1000),
    isLogado: false
  }
}))

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Definindo as rotas
app.use('/', indexRouter);
app.use('/api/usuarios', usersRouter);
app.use('/api/configuracoes', configuracoesRouter);
app.use('/api/fornecedores', fornecedoresRouter);
app.use('/api/empresas', empresasRouter);
app.use('/api/estoques', estoquesRouter);
app.use('/api/hierarquias', hierarquiasRouter);
app.use('/api/categoria_produtos', categoria_produtosRouter);
app.use('/api/grupo_produtos', grupo_produtosRouter);
app.use('/api/unidade_medidas', unidade_medidasRouter);
app.use('/api/produtos', produtosRouter);
app.use('/api/notificacoes', notificacaoRouter);
app.use('/api/movimentacao', movimentacaoRouter);
app.use('/api/tipo_documento', tipoDocumentoRouter);
// rotas relatorios
app.use('/api/relatorios/produtos', r_produtosRouter);
// rota de validação de token
app.use('/api/validar', validarRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
