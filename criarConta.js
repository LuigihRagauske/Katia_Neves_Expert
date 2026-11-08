document.querySelectorAll('.role').forEach(function(b){
  b.addEventListener('click',function(){
    document.querySelectorAll('.role').forEach(function(x){x.classList.remove('on')});
    b.classList.add('on');
  });
});
document.querySelectorAll('.eye').forEach(function(b){
  b.addEventListener('click',function(){
    var i=b.parentNode.querySelector('input');
    var show=i.type==='password';
    i.type=show?'text':'password';
    b.classList.toggle('show',show);
    b.setAttribute('aria-label',show?'Ocultar senha':'Mostrar senha');
  });
});
