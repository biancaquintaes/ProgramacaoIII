var dataUrl = "dados/menu.json",
    itensHtml = "template.html";
	itensHtml2 = "templateMenu.html";
    
// função facilitadora para inserir HTML em um elemento
function insereHtml(seletor, html) {
  var elemento = document.querySelector(seletor);
  console.log(html);
  elemento.innerHTML = html;
}

// substitui propriedade {{propName}} dentro de um 
// 'template', e substitui por seu propValue
function inserePropriedade(template, propName, propValue) {
  // criar {{propName}}
  // trocar (replace), dentro de template, {{propName}} por propValue
  // retornar o template alterado
  var propriedade = "{{" + propName + "}}";
  // substitui todas as ocorrências de propriedade por propValue
  // em template
  template = template.replace(new RegExp(propriedade, "g"),
              propValue);
  return template;
}

// constroi a pagina, com os dados recebidos por parametro
function constroiPagina(dados) {
  var htmlFinal = '<section class="row">'; // string que vai conter todo o HTML
  // construimos os itens agora
  $ajaxUtils.sendGetRequest(itensHtml, function(itensHtml) {
    for (var i = 0, max = dados.length; i < max; i++) {
      var html = itensHtml,
          titulo = dados[i].titulo,
          Conteudo = dados[i].Conteudo;
          
      html = inserePropriedade(html, "titulo", titulo);
      html = inserePropriedade(html, "Conteudo", Conteudo);
      
      htmlFinal += html;
    }
    htmlFinal += '</section>';
    insereHtml("#content", htmlFinal);
  }, false); // não é um JSON
}

function constroiMenu(dados) {
	var htmlFinal2 = "";
  // construimos os itens agora
  $ajaxUtils.sendGetRequest(itensHtml2, function(itensHtml2) {
    for (var i = 0, max = dados.length; i < max; i++) {
      var html2 = itensHtml2,
          titulo = dados[i].titulo,
          
      html2 = inserePropriedade(html2, "titulo", titulo);
      
      htmlFinal2 += html2;
    }
    insereHtml("#menuInicio", htmlFinal2);
  }, false); // não é um JSON
}
// vamos construir o sendGetRequest:
// definir a URL (dataUrl)
// e o metodo constroiPagina
$ajaxUtils.sendGetRequest(dataUrl, constroiPagina);
