  var element = document.getElementById('test');
  var list = new List();


  var _demosObject= [{
    title: 'sion',
    id: 0,
    children:[
      {
        title: 'amaris',
        id: 1
      },
      {
        title: 'good',
        id: 4
      },
      {
        title:'glass',
        id:2,
        children:[
          {
            title: 'candy',
            id:3
          },
          {
            title:'miller',
            id:4,
            children:[
              {
                title: 'lo unico',
                id: 5
              },
              {
                title:'florence',
                id: 6
              },
              {
                title: 'philip',
                id: 7,
                children:[
                  {
                    title: 'lisp',
                    id: 8
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }];

  /////////////////from book,
  /////dynamic scope
  var stackBinder = list.stack(function(stack, v){
    stack.push(v);
    return stack;
  });


  stackBinder('a', 'content');
  stackBinder('b', 'lo ves?');
  var unStackBinder = list.stack(function(stack, v){
    stack.pop();
    return stack;
  });
  ({f: function(){
    //console.log(this);
    return this;
  }}).f.call('!');


  function factorial (n) {
      //console.log(n);
      return !(n > 1) ? 1 : factorial(n - 1) * n;
  }

  ////////////////////////////////////////////////////////////////////////////////
  function iteration(map, compare){
    ///aqui necesito la function de i++ compare
    var i=0, l=map.length;
    return function(stack){
      for (i; i<l;i++)
        stack = compare(stack[map[i]]);

      return stack;
    }
  }


 /* var s = iteration(
    pattern('0.1.1.2'), function(stack){
      if(typeof(stack)=='undefined') return false;
      return stack.children || stack;
    }
  )(_demosObject);
  var t = iteration(
    pattern('0.1'), function(stack){
      return compare(stack);
    }
  )(_demosObject);

  
*/
function compare(stack){
  console.log(stack, 444, 00)
  if(typeof(stack)=='undefined') return false;
  
  return stack.children || stack;
}
  function pattern(str){
    if(!/\./.test(str)) return [+str];
    return str.split('.');
  }
function compared(stack){
  console.log(stack, 333);
  if(typeof(stack)=='undefined') return false;
  return stack.children || stack;
};

  //console.log(s, 'at the result');
  //console.log(t, 'on the other hand');
/////Trampolin
///no es complicado recibe la function encapsulada en contexto
//f, comprueba su tipo(fundamental en cualquier programacion)
/// y si es function entonces ejecuta, en otro caso retorna el valor informado
/// el avance que propone la web de readme es un array,
///que hace de pila
/////////////////////////////////////////////////////////
  function trampoline(f) {
    while (f && f instanceof Function) {
      f = f();////es aqui cuando lo llama f()
    }
    return f;
  }

//////y ahora lo voy a aplicar
//////impreeeeesionante tecnica.
/////parece mas light, y sencilla bastante
///// modelo abstracto de objeto
  function deepAbstractSearch(stack, compare, next){
    var founded =[]; 
    function find(stack){
      for(k in stack){
        if(compare(stack[k])){
          founded.push(stack[k]);
        }
        if(next(stack[k])){    
          trampoline(find.bind(null, stack[k]));
        }
      }
      /////recupero los encontrados
      return founded;
    }
    ///pero solo se añade a trampoline 1 vez!!1,
    ///sin embargo esta por cada bind previo
    return trampoline(find.bind(null, stack));
  }
//aplico la solucion de busqueda.
/*var ss = deepSearch(_demosObject, function(o){
  return (o.id===8);
}, function(o){return (o.children);});*/
var ss = 'nit';
var app = new Vue({
    el: '#app',
    data: {
      search:'',
      message: 'Hello Vue!'+ss
    },
    created: function () {
      this.fetchData();
      
    },
    methods: {
      fetchData: function () {
        var self = this;
        $.get( '/demo/complex.json', function( data ) {
            self.items = data;
            var t = deepAbstractSearch(data, function(o){
              return (o.id=='1044401');
            }, 
            function(o){
              return (Object.prototype.toString.call(o) === '[object Array]' || Object.prototype.toString.call(o) === '[object Object]');
            });
            console.log(t, 'poppp');
        });

      }
    }
});

//  console.log(ss, ' jjajajja deep search nested!!!!');
$.get( '/demo/esprima.json', function( data ) {
  console.log(data);
  self.items = data;
  var t = deepAbstractSearch(data, function(o){
    console.log();
    return (o && o.callee && o.callee.object && o.callee.object.name=='console' && o.arguments && o.arguments.length==2 && o.arguments[1].value=='is 9999999999999999');
  }, 
  function(o){
    return (Object.prototype.toString.call(o) === '[object Array]' || Object.prototype.toString.call(o) === '[object Object]');
  });
  console.log(t, 'poppp');
});