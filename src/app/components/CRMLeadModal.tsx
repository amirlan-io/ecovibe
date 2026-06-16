import { useEffect, useRef } from "react";
import { X } from "lucide-react";

interface CRMLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CRMLeadModal({ isOpen, onClose }: CRMLeadModalProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Создаем контейнер для CRM формы
    const formContainer = document.createElement("div");
    formContainer.id = "crm-lead-form-84be7530-2d6a-4066-b548-06748a90aada";

    if (containerRef.current) {
      containerRef.current.innerHTML = "";
      containerRef.current.appendChild(formContainer);
    }

    // Добавляем скрипт CRM формы
    const script = document.createElement("script");
    script.text = `
(function(){var u="84be7530-2d6a-4066-b548-06748a90aada",a="https://crm.tennet.kz/api/public/forms/84be7530-2d6a-4066-b548-06748a90aada/",c=document.getElementById("crm-lead-form-"+u);
c.innerHTML='<p style="text-align:center;color:#888;padding:20px;">Загрузка формы...</p>';
fetch(a).then(function(r){if(!r.ok)throw new Error();return r.json()}).then(function(cfg){
var s=cfg.styling,f=cfg.form_fields||[],h='<div style="max-width:'+s.formMaxWidth+';width:'+s.formWidth+';padding:'+s.formPadding+';border-radius:'+s.formBorderRadius+';background:'+s.formBackgroundColor+';box-shadow:'+s.formShadow+';font-family:'+s.fontFamily+';margin:0 auto;box-sizing:border-box;">';
h+='<h2 style="color:'+s.titleColor+';font-size:'+s.titleFontSize+';font-weight:'+s.titleFontWeight+';margin:0 0 '+s.titleMarginBottom+' 0;text-align:'+s.titleTextAlign+';">'+cfg.form_title+'</h2>';
h+='<form id="crm-f-'+u+'">';
f.forEach(function(fld){
var fieldId='crm-field-'+u+'-'+fld.name;
var fieldLabel=fld.label.replace(/"/g,'&quot;');
h+='<div style="margin-bottom:'+s.inputMarginBottom+';">';
h+='<label for="'+fieldId+'" style="display:block;color:'+s.labelColor+';font-size:'+s.labelFontSize+';font-weight:'+s.labelFontWeight+';margin-bottom:'+s.labelMarginBottom+';">'+fld.label+(fld.required?' <span style="color:'+s.errorColor+'">*</span>':'')+'</label>';
var ist='width:100%;box-sizing:border-box;background:'+s.inputBackgroundColor+';border:1px solid '+s.inputBorderColor+';border-radius:'+s.inputBorderRadius+';padding:'+s.inputPadding+';font-size:'+s.inputFontSize+';color:'+s.inputTextColor+';font-family:inherit;outline:none;';
var isPhone=(fld.type==='tel'||(fld.fieldType==='standard'&&fld.standardField==='phone'));
if(fld.type==='textarea'){h+='<textarea id="'+fieldId+'" name="'+fld.name+'" aria-label="'+fieldLabel+'" placeholder="'+(fld.placeholder||'')+'"'+(fld.required?' required':'')+' style="'+ist+'min-height:100px;resize:vertical;"></textarea>';}
else if(fld.type==='select'&&fld.options){h+='<select id="'+fieldId+'" name="'+fld.name+'" aria-label="'+fieldLabel+'"'+(fld.required?' required':'')+' style="'+ist+'">';h+='<option value="">'+(fld.placeholder||'Выберите...')+'</option>';fld.options.forEach(function(o){h+='<option value="'+o.value+'">'+o.label+'</option>';});h+='</select>';}
else{h+='<input id="'+fieldId+'" type="'+(fld.type||'text')+'" name="'+fld.name+'" aria-label="'+fieldLabel+'" placeholder="'+(fld.placeholder||'')+'"'+(fld.required?' required':'')+' style="'+ist+'"'+(isPhone?' data-phone-mask="true"':'')+'>';}
h+='</div>';
});
if(cfg.honeypot_field){h+='<input type="text" name="'+cfg.honeypot_field+'" aria-hidden="true" style="display:none;" tabindex="-1" autocomplete="off">';}
h+='<div style="margin-top:'+s.inputMarginBottom+';margin-bottom:'+s.inputMarginBottom+';">';
h+='<label for="crm-consent-'+u+'" style="display:flex;align-items:flex-start;gap:8px;cursor:pointer;font-size:'+s.labelFontSize+';color:'+s.labelColor+';line-height:1.4;">';
h+='<input type="checkbox" id="crm-consent-'+u+'" required style="margin-top:3px;flex-shrink:0;width:16px;height:16px;cursor:pointer;">';
h+='<span>Даю согласие на сбор и обработку персональных данных в соответствии с <a href="https://adilet.zan.kz/rus/docs/Z1300000094" target="_blank" rel="noopener noreferrer" style="color:'+s.buttonBackgroundColor+';text-decoration:underline;">законом</a> РК</span>';
h+='</label>';
h+='</div>';
h+='<button type="submit" id="crm-btn-'+u+'" style="background:'+s.buttonBackgroundColor+';color:'+s.buttonTextColor+';font-size:'+s.buttonFontSize+';font-weight:'+s.buttonFontWeight+';padding:'+s.buttonPadding+';border-radius:'+s.buttonBorderRadius+';width:'+s.buttonWidth+';margin-top:'+s.buttonMarginTop+';border:none;cursor:pointer;font-family:inherit;">'+cfg.submit_button_text+'</button>';
h+='</form>';
h+='<div id="crm-ok-'+u+'" style="display:none;background:'+s.successBackgroundColor+';color:'+s.successTextColor+';border-radius:'+s.successBorderRadius+';padding:'+s.successPadding+';text-align:center;">'+cfg.success_message+'</div>';
h+='</div>';
c.innerHTML=h;
var phoneInputs=document.querySelectorAll('#crm-f-'+u+' input[data-phone-mask="true"]');
phoneInputs.forEach(function(input){
function formatPhone(value){
var digits=value.replace(/\\D/g,'');
if(digits.length===0)return'';
if(digits[0]==='8'){digits='7'+digits.substring(1);}
if(digits[0]==='7'||digits[0]==='+'){if(digits[0]==='+')digits=digits.substring(1);if(digits[0]!=='7')digits='7'+digits;}
else{digits='7'+digits;}
if(digits.length>11)digits=digits.substring(0,11);
if(digits.length===1)return'+7';
if(digits.length<=4)return'+7 '+digits.substring(1);
if(digits.length<=7)return'+7 '+digits.substring(1,4)+' '+digits.substring(4);
if(digits.length<=9)return'+7 '+digits.substring(1,4)+' '+digits.substring(4,7)+' '+digits.substring(7);
return'+7 '+digits.substring(1,4)+' '+digits.substring(4,7)+' '+digits.substring(7,9)+' '+digits.substring(9);
}
input.addEventListener('input',function(e){
var val=e.target.value,pos=e.target.selectionStart,formatted=formatPhone(val);
e.target.value=formatted;
var newPos=Math.min(pos+formatted.length-val.length,formatted.length);
e.target.setSelectionRange(newPos,newPos);
});
input.addEventListener('keydown',function(e){
if(e.key==='Backspace'&&e.target.selectionStart<=3){e.preventDefault();e.target.value='';}
});
input.addEventListener('paste',function(e){
e.preventDefault();
var pasted=e.clipboardData.getData('text');
e.target.value=formatPhone(pasted);
});
});
document.getElementById('crm-f-'+u).addEventListener('submit',function(e){
e.preventDefault();var cb=document.getElementById('crm-consent-'+u);if(!cb.checked){alert('Необходимо дать согласие на обработку персональных данных');return;}
var btn=document.getElementById('crm-btn-'+u),ot=btn.textContent;btn.textContent='Отправка...';btn.disabled=true;
var fd=new FormData(this),d={};fd.forEach(function(v,k){d[k]=v;});
fetch(a,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(d)})
.then(function(r){if(!r.ok)return r.json().then(function(e){throw e;});return r.json();})
.then(function(res){document.getElementById('crm-f-'+u).style.display='none';var ok=document.getElementById('crm-ok-'+u);if(res.message)ok.textContent=res.message;ok.style.display='block';if(res.redirect_url)setTimeout(function(){window.location.href=res.redirect_url;},2000);})
.catch(function(err){console.error(err);var msg='Ошибка отправки';if(err&&err.error)msg=err.error;else if(err&&err.detail)msg=err.detail;alert(msg);btn.textContent=ot;btn.disabled=false;});
});
}).catch(function(e){console.error(e);c.innerHTML='<p style="color:#dc2626;text-align:center;padding:20px;">Ошибка загрузки формы</p>';});
})();
    `;

    if (containerRef.current) {
      containerRef.current.appendChild(script);
    }

    // Блокируем скролл body когда модалка открыта
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
          aria-label="Закрыть"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        <div ref={containerRef} className="p-6" />
      </div>
    </div>
  );
}
