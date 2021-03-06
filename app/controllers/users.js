'use strict';

var User = require('../models/user');

exports.new = function(req, res){
  res.render('users/new');
};

exports.login = function(req, res){
  res.render('users/login');
};

exports.logout = function(req, res){
  req.session.destroy(function(){
    res.redirect('/');
  });
};

exports.create = function(req, res){
  User.register(req.body, function(err, user){
    if(user){
      res.redirect('/');
    }else{
      res.redirect('/register');
    }
  });
};

exports.authenticate = function(req, res){
  User.authenticate(req.body, function(user){
    if(user){
      req.session.regenerate(function(){
        req.session.userId = user._id;
        req.session.save(function(){
          res.redirect('/');
        });
      });
    }else{
      res.redirect('/login');
    }
  });
};

exports.profile = function(req,res){
  res.render('users/profile');
};

exports.edit = function(req,res){
  res.render('users/edit');
};

exports.update = function(req,res){
  console.log('req.body>>>>>>>>>>', req.body);
  console.log('res.locals.user>>>>>>>>>', res.locals.user);
//    res.locals.user.save(req.body, function(){
  res.redirect('/profile');
//  });
};

exports.index = function(req,res){
  User.find({isPublic:true}, function(err, users){
    res.render('users/index', {users:users});
  });
};

exports.show = function(req,res){
  User.findOne({_id:req.params.userId, isPublic:true}, function(err, client){
    if(client){
      res.render('users/client', {client:client});
    }else{
      res.redirect('/users');
    }
  });
};
