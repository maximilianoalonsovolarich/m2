var traverseDomAndCollectElements = function (matchFunc, startEl) {
  var resultSet = [];

  if (typeof startEl === "undefined") {
    startEl = document.body;
  }

  // recorre el árbol del DOM y recolecta elementos que matchien en resultSet
  // usa matchFunc para identificar elementos que matchien

  // TU CÓDIGO AQUÍ
  if (matchFunc(startEl)) resultSet.push(startEl);
  if (Array.from(startEl.children).length) {
    for (const node of startEl.children) {
      let element = traverseDomAndCollectElements(matchFunc, node);
      resultSet = [...resultSet, ...element];
    }
  }
  return resultSet;
};

// Detecta y devuelve el tipo de selector
// devuelve uno de estos tipos: id, class, tag.class, tag


var selectorTypeMatcher = function (selector) {
  // tu código aquí
  // let firstElement = selector.charAt(0);
  // console.log(firstElement);
  if (selector[0] === '#') {
    // console.log(selector, firstElement, 'id');
    return 'id';
  } else if (selector[0] === '.') {
    // console.log(selector, firstElement, 'class');
    return 'class';
  } else if (selector.split('.').length > 1) {
    // console.log(selector, firstElement, 'tag.class');
    return 'tag.class';
  } else {
    // console.log(selector, firstElement, 'tag');
    return 'tag';
  }
};

// NOTA SOBRE LA FUNCIÓN MATCH
// recuerda, la función matchFunction devuelta toma un elemento como un
// parametro y devuelve true/false dependiendo si el elemento
// matchea el selector.

var matchFunctionMaker = function (selector) {
  var selectorType = selectorTypeMatcher(selector);
  var matchFunction;
  if (selectorType === "id") {
    matchFunction = function (elemento) {
      return '#' + elemento.id === selector;
    }
  } else if (selectorType === "class") {
    matchFunction = function (elemento) {
      var classes = elemento.classList;
      // classes.forEach(e => {if(`.${e}` === selector) return true})
      for (let i = 0; i < classes.length; i++) {
        if (`.${classes[i]}` === selector) return true;
      }
      return false;
    }
  } else if (selectorType === "tag.class") {
    matchFunction = function (elemento) {
      var [tagBuscado, claseBuscada] = selector.split('.');
      return matchFunctionMaker(tagBuscado)(elemento) && matchFunctionMaker(`.${claseBuscada}`)(elemento);
    }
  } else if (selectorType === "tag") {
    matchFunction = function (elemento) {
      return elemento.tagName.toLowerCase() === selector;
    }
  }
  return matchFunction;
};

var $ = function (selector) {
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};