/* Sofía is a local, guided quote assistant. No remote AI or automatic data transfer. */
(() => {
  const root = document.getElementById('sofia-widget');
  if (!root) return;

  const PHONE = '56962306924';
  const areas = {
    'Piscinas y bienestar': ['Piscinas de fibra de vidrio','Jacuzzis','Tinajas','Sauna o spa','Bombas de calor y climatización','Mantas térmicas y cobertores','Bombas y filtración','Mantención, reparación o pintado','Robot limpiafondos y accesorios','Otro proyecto de bienestar'],
    'Electricidad e ingeniería': ['Proyectos y planos eléctricos','Instalaciones domiciliarias e industriales','Tableros y protecciones','Mantención eléctrica','Iluminación','Automatización y control','Domótica e inmótica','Paneles solares','Sistemas eólicos','Puesta a tierra y regularización','Otro proyecto eléctrico'],
    'Comercializadora y suministros': ['Ferretería y herramientas','Tuberías y fittings','Hidráulica y bombeo','Material eléctrico','Iluminación y luminarias','Lista de materiales','Otros suministros']
  };
  const areaDescriptions = {
    'Piscinas y bienestar':'Piscinas, jacuzzis, tinajas, climatización y cuidado del agua',
    'Electricidad e ingeniería':'Instalaciones, tableros, iluminación y sistemas inteligentes',
    'Comercializadora y suministros':'Ferretería, hidráulica y materiales para tu proyecto'
  };
  const quickAnswers = {
    'Piscinas y bienestar': {
      '¿Qué opciones tienen?':'Puedes consultar piscinas, jacuzzis, tinajas, sauna o spa, climatización, bombas, cobertores y mantención. Revisamos alcance y disponibilidad al cotizar.',
      '¿Qué medidas necesitan?':'Ayudan el largo, ancho y profundidad, además del espacio disponible y la comuna. Si aún no tienes medidas, igual podemos orientarte.'
    },
    'Electricidad e ingeniería': {
      '¿Qué trabajos realizan?':'Puedes consultar proyectos, instalaciones, tableros, iluminación, mantención, automatización, domótica, solar y puesta a tierra. El alcance se evalúa.',
      '¿Qué datos necesitan?':'Cuéntanos el tipo de inmueble, el trabajo que buscas y tu comuna. Si tienes planos o antecedentes, el equipo podrá revisarlos.'
    },
    'Comercializadora y suministros': {
      '¿Qué productos puedo consultar?':'Ferretería, herramientas, tuberías, fittings, hidráulica, material eléctrico y luminarias. La disponibilidad se confirma en la cotización.',
      '¿Puedo enviar una lista?':'Sí. Indica productos, medidas y cantidades aproximadas. El equipo revisará alternativas y disponibilidad contigo.'
    }
  };
  const state = {step:'area',area:'',interest:'',name:'',phone:'',city:''};
  root.innerHTML = `
    <button class="sofia-launcher" id="sofia-launcher" type="button" aria-label="Abrir asistente Sofía" aria-expanded="false" aria-controls="sofia-panel">
      <span class="sofia-orb" aria-hidden="true"><span class="sofia-orb-core">S</span></span>
      <span>¿En qué te ayudamos?</span>
    </button>
    <section class="sofia-panel" id="sofia-panel" role="dialog" aria-modal="false" aria-labelledby="sofia-title" hidden>
      <div class="sofia-head">
        <span class="sofia-head-orb" aria-hidden="true">S</span>
        <div><h2 id="sofia-title">Sofía · JECHMAN</h2><p>Explora servicios y prepara tu consulta</p></div>
        <button class="sofia-close" id="sofia-close" type="button" aria-label="Cerrar asistente">×</button>
      </div>
      <div class="sofia-progress" id="sofia-progress" role="group" aria-label="Paso 1 de 3"><span></span><span></span><span></span></div>
      <div class="sofia-messages" id="sofia-messages" role="log" aria-label="Conversación con Sofía" aria-live="polite" aria-relevant="additions text"></div>
      <form class="sofia-compose" id="sofia-compose">
        <label class="sofia-visually-hidden" for="sofia-input">Tu respuesta</label>
        <input id="sofia-input" name="respuesta" type="text" autocomplete="off" maxlength="180" placeholder="Escribe tu respuesta" required>
        <button type="submit" aria-label="Enviar respuesta"><svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m4 12 16-8-5 16-3-7-8-1Zm8 1 8-9"/></svg></button>
      </form>
      <div class="sofia-foot"><span>Tu mensaje se enviará solo si lo confirmas en WhatsApp.</span><a href="#/legal">Privacidad</a></div>
    </section>`;

  const launcher = root.querySelector('#sofia-launcher');
  const panel = root.querySelector('#sofia-panel');
  const close = root.querySelector('#sofia-close');
  const log = root.querySelector('#sofia-messages');
  const form = root.querySelector('#sofia-compose');
  const input = root.querySelector('#sofia-input');
  const progress = root.querySelector('#sofia-progress');

  if (window.matchMedia('(pointer:fine) and (prefers-reduced-motion:no-preference)').matches) {
    const orb = launcher.querySelector('.sofia-orb');
    launcher.addEventListener('pointermove', event => {
      const rect = launcher.getBoundingClientRect();
      orb.style.setProperty('--sofia-tilt-x', `${((event.clientY - rect.top) / rect.height - .5) * -22}deg`);
      orb.style.setProperty('--sofia-tilt-y', `${((event.clientX - rect.left) / rect.width - .5) * 22}deg`);
    });
    launcher.addEventListener('pointerleave', () => {
      orb.style.removeProperty('--sofia-tilt-x');
      orb.style.removeProperty('--sofia-tilt-y');
    });
  }

  function syncCookieSpacing() {
    const notice = document.getElementById('cookie-banner');
    root.classList.toggle('sofia-cookie-visible', Boolean(notice && !notice.hidden));
  }
  const cookieNotice = document.getElementById('cookie-banner');
  if (cookieNotice) new MutationObserver(syncCookieSpacing).observe(cookieNotice,{attributes:true,attributeFilter:['hidden']});
  syncCookieSpacing();

  function open() {
    panel.hidden = false;
    launcher.setAttribute('aria-expanded','true');
    root.classList.add('sofia-open');
    if (!log.children.length) greet();
    if (form.hidden) log.querySelector('.sofia-choices button')?.focus(); else input.focus();
  }
  function hide() {
    panel.hidden = true;
    launcher.setAttribute('aria-expanded','false');
    root.classList.remove('sofia-open');
    launcher.focus();
  }
  launcher.addEventListener('click',()=>panel.hidden?open():hide());
  close.addEventListener('click',hide);
  panel.addEventListener('keydown',event=>{if(event.key==='Escape'){event.preventDefault();hide()}});

  function scrollEnd(){log.scrollTop=log.scrollHeight}
  function bubble(text,who='bot'){
    const item=document.createElement('p');
    item.className=`sofia-message sofia-message--${who}`;
    item.textContent=text;
    log.append(item);
    scrollEnd();
  }
  function choices(labels,areaChoice=false){
    const group=document.createElement('div');
    group.className='sofia-choices'+(areaChoice?' sofia-area-choices':'');
    group.setAttribute('role','group');
    group.setAttribute('aria-label','Opciones de consulta');
    labels.forEach(label=>{
      const button=document.createElement('button');
      button.type='button';
      if(areaChoice){
        button.setAttribute('aria-label',label);
        const title=document.createElement('strong');title.textContent=label;
        const detail=document.createElement('small');detail.textContent=areaDescriptions[label];
        button.append(title,detail);
      }else button.textContent=label;
      button.addEventListener('click',()=>{group.remove();answer(label)});
      group.append(button);
    });
    log.append(group);
    scrollEnd();
  }
  function setStep(step){
    state.step=step;
    root.classList.toggle('sofia-area-step',step==='area');
    const index=step==='area'?1:step==='requirement'?2:3;
    progress.setAttribute('aria-label',`Paso ${index} de 3`);
    [...progress.children].forEach((bar,i)=>bar.classList.toggle('is-active',i<index));
    form.hidden=step==='area'||step==='done';
    input.type=step==='phone'?'tel':'text';
    input.inputMode=step==='phone'?'tel':'text';
    input.maxLength=step==='requirement'?180:80;
    input.autocomplete=step==='name'?'name':step==='phone'?'tel':step==='city'?'address-level2':'off';
    input.placeholder=step==='requirement'?'Producto o proyecto':step==='name'?'Tu nombre':step==='phone'?'+56 9 ...':'Comuna o ciudad';
  }
  function greet(){
    setStep('area');
    bubble('Hola, soy Sofía. ¿En cuál de estas tres áreas te puedo orientar?');
    choices(Object.keys(areas),true);
    const direct=document.createElement('a');
    direct.className='sofia-direct';
    direct.href=`https://wa.me/${PHONE}?text=${encodeURIComponent('Hola JECHMAN, quisiera consultar por un producto o proyecto.')}`;
    direct.target='_blank';direct.rel='noopener noreferrer';
    direct.textContent='Prefiero escribir directamente por WhatsApp ↗';
    log.append(direct);
  }
  function valid(value){
    if(state.step==='area')return areas[value]?'':'Elige una de las tres áreas para continuar.';
    if(state.step==='requirement')return value.length>=3?'':'Cuéntame brevemente qué producto o proyecto buscas.';
    if(state.step==='name')return value.length>=2?'':'Indica tu nombre para preparar la consulta.';
    if(state.step==='phone'){const digits=value.replace(/\D/g,'');return digits.length>=8&&digits.length<=15?'':'Revisa el número: debe tener entre 8 y 15 dígitos.';}
    if(state.step==='city')return value.length>=2?'':'Indica tu comuna o ciudad.';
    return '';
  }
  function guidance(interest){
    const topic=interest.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
    if(/manta|cobertor/.test(topic))return 'Para un cobertor, ayudan el largo y ancho de la piscina. Material y ajuste se confirman al cotizar.';
    if(/calor|climat|calef/.test(topic))return 'Para climatización, ayudan las medidas de la piscina y el uso previsto. El equipo se define tras evaluación.';
    if(/filtro|bomba|hidraul/.test(topic))return 'Para filtración, importan las medidas y la instalación existente. El caudal y la compatibilidad requieren revisión técnica.';
    if(/tablero|electri|fuerza/.test(topic))return 'Para tableros, ayuda saber si la instalación es nueva o existente y qué equipos alimentará. La especificación se revisa técnicamente.';
    if(/domot|automat/.test(topic))return 'En automatización, cuéntanos qué espacios o funciones quieres controlar. La integración se evalúa caso a caso.';
    if(/piscina|jacuzzi|tinaja/.test(topic))return 'Para orientar el proyecto, ayudan las medidas del espacio y el tipo de uso que imaginas. Cada instalación se evalúa.';
    return 'Cuéntanos el contexto y el equipo revisará opciones y factibilidad antes de cotizar.';
  }
  function showQuickAnswers(){
    const group=document.createElement('div');group.className='sofia-quick-answers';
    group.setAttribute('role','group');group.setAttribute('aria-label','Preguntas rápidas');
    const label=document.createElement('p');label.textContent='Antes de cotizar, también puedes preguntar:';group.append(label);
    Object.entries(quickAnswers[state.area]).forEach(([question,reply])=>{
      const button=document.createElement('button');button.type='button';button.textContent=question;
      button.addEventListener('click',()=>{bubble(question,'user');bubble(reply);scrollEnd()});
      group.append(button);
    });
    log.append(group);scrollEnd();
  }
  function answer(value){
    if(state.step==='done')return;
    const text=value.trim().replace(/\s+/g,' ').slice(0,state.step==='requirement'?180:80);
    const error=valid(text);
    if(error){bubble(error);input.focus();return;}
    bubble(text,'user');
    input.value='';
    if(state.step==='area'){
      state.area=text;setStep('requirement');bubble('Estas son algunas de las soluciones que puedes consultar. ¿Cuál te interesa?');choices(areas[text]);
      const change=document.createElement('button');change.type='button';change.className='sofia-change-area';change.textContent='Cambiar de área';change.addEventListener('click',restart);log.append(change);
    }else if(state.step==='requirement'){
      state.interest=text;setStep('name');bubble(guidance(text));bubble('Si quieres cotizar, dime tu nombre. Puedes resolver una duda rápida primero.');showQuickAnswers();
    }else if(state.step==='name'){
      log.querySelector('.sofia-quick-answers')?.remove();
      state.name=text;setStep('phone');bubble(`${text}, ¿qué número de teléfono o WhatsApp podemos incluir en la consulta?`);
    }else if(state.step==='phone'){
      state.phone=text;setStep('city');bubble('¿En qué comuna o ciudad será el proyecto?');
    }else if(state.step==='city'){
      state.city=text;setStep('done');finish();
    }
    if(state.step==='requirement'&&state.area&&!state.interest)log.querySelector('.sofia-choices button')?.focus();
    else if(state.step!=='done')input.focus();
  }
  function restart(){Object.assign(state,{step:'area',area:'',interest:'',name:'',phone:'',city:''});log.replaceChildren();greet();log.querySelector('.sofia-choices button')?.focus()}
  function finish(){
    bubble(`${state.name}, tu mensaje está listo. Puedes revisarlo en WhatsApp antes de enviarlo al equipo de JECHMAN.`);
    const message=`Hola JECHMAN, soy ${state.name}. Área: ${state.area}. Necesito: ${state.interest}. Mi teléfono o WhatsApp es ${state.phone} y el proyecto será en ${state.city}. ¿Podemos revisar factibilidad, opciones y cotización?`;
    const actions=document.createElement('div');actions.className='sofia-finish';
    const send=document.createElement('a');send.className='sofia-whatsapp';send.href=`https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;send.target='_blank';send.rel='noopener noreferrer';send.textContent='Revisar y enviar por WhatsApp ↗';
    const reset=document.createElement('button');reset.type='button';reset.textContent='Nueva consulta';reset.addEventListener('click',restart);
    actions.append(send,reset);log.append(actions);form.hidden=true;scrollEnd();
  }
  form.addEventListener('submit',event=>{event.preventDefault();answer(input.value)});
})();
