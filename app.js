var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


// importando as rotas
var indexRouter = require('./app/routes/index');
var usersRouter = require('./app/routes/usuarios');
var fornecedoresRouter = require('./app/routes/fornecedores');
var configuracoesRouter = require('./app/routes/configuracoes');
var empresasRouter = require('./app/routes/empresas');
var estoquesRouter = require('./app/routes/estoques');
var hierarquiasRouter = require('./app/routes/hierarquias');
var categoria_produtosRouter = require('./app/routes/categoria_produtos');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'jade');

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
