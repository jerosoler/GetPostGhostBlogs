var request = require('request');
const chalk = require('chalk');
const log = console.log;


var www = process.argv[2];


log(chalk.green('Dominio Buscado:') + ' ' + chalk.bgGreen.black(www));
request(www, function (error, response, body) {
    let n = body.search("clientSecret:");
    let nr = body.indexOf('"', n);
    let nr2 = body.indexOf('"', nr+1);
    let clientsecrect = body.substr(nr+1,nr2-nr-1);

    if(clientsecrect != "") {

    request({ url: www+'/ghost/api/v0.1/posts/?client_id=ghost-frontend&client_secret='+clientsecrect+'', json:true},  function (error, response, body) {
      meta = body.meta.pagination;

      log(chalk.red('Posts Total:') + ' ' + chalk.bgRed(meta.total));
      log(chalk.cyan('Pages Total:') + ' ' + chalk.bgCyan.black(meta.pages));

      var z= 1;
      request({ url: www+'/ghost/api/v0.1/posts/?limit='+meta.total+'&client_id=ghost-frontend&client_secret='+clientsecrect+'', json:true},  function (error, response, body) {
        var allposts = body.posts;

        allposts.forEach(function(value){

            log(chalk.bgYellow('['+z+']:') + ' ' +value.title);
            z++;
        });
      });


    });
  } else {
    log(chalk.bgRed('SECRET No encontrado.'));
  }

});
