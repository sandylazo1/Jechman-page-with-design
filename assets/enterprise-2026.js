/* ==========================================================================
   JECHMAN Enterprise Tier Interactive Logic (2026/2027)
   Spotlight Card, Pool Engineering Stages, Domótica Tabs, Email Dispatch
   ========================================================================== */

(() => {
  // 1. React Bits Inspired: Spotlight Card Cursor Tracking
  function initSpotlight() {
    const cards = document.querySelectorAll('.spotlight-card, .card, .division-card, .news-card, .catalog-card');
    cards.forEach(card => {
      card.classList.add('spotlight-card');
      card.addEventListener('pointermove', e => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
      }, { passive: true });
    });
  }

  // 2. Módulo de Ingeniería de Piscinas: Datos y Cambiador de Fases
  const poolPhases = [
    {
      num: '01 / 06',
      title: 'Matriz y Aplicación de Gel Coat ISO/NPG',
      phase: 'Fase 01 · Barrera Química y Filtro UV',
      desc: 'En cabina presurizada con temperatura controlada (21°C), se aplica una capa uniforme de 800 micras de Gel Coat isoftálico neopentilglicol (ISO/NPG). Proporciona resistencia total a la ósmosis, brillo de grado náutico y protección certificada contra radiación UV.',
      image: 'assets/projects/pool-construction.jpg',
      specs: [
        { label: 'Espesor Gel Coat', val: '800 µm nanométrico' },
        { label: 'Polimerización', val: 'Catalizada al 2% MEKP' },
        { label: 'Acabado', val: 'Cero porosidad náutica' },
        { label: 'Protección', val: 'Filtro UV Anti-decoloración' }
      ]
    },
    {
      num: '02 / 06',
      title: 'Laminado Multicapa con Resina Viniléster',
      phase: 'Fase 02 · Resistencia Estructural y Sismo',
      desc: 'Estratificación cruzada de esteras de fibra roving de 450 g/m² y 800 g/m² impregnadas con resina de viniléster de alta resiliencia. Este núcleo compuesto absorbe deformaciones sísmicas del terreno chileno sin fisurarse.',
      image: 'assets/projects/pool-fiberglass.jpg',
      specs: [
        { label: 'Fibra de Vidrio', val: 'Roving 450/800 g/m²' },
        { label: 'Matriz Resínica', val: 'Viniléster ortoftálica' },
        { label: 'Resistencia Tracción', val: '> 110 MPa certificada' },
        { label: 'Elasticidad', val: 'Flexión torsional activa' }
      ]
    },
    {
      num: '03 / 06',
      title: 'Refuerzos Perimetrales y Curado Térmico',
      phase: 'Fase 03 · Rigidez Perimetral y Desmolde',
      desc: 'Se integran costillas de refuerzo en perfiles tubulares de acero embutidos bajo la pestaña superior y laterales. El casco pasa por curado térmico para estabilizar las cadenas poliméricas antes de la inspección por ultrasonido.',
      image: 'assets/pools-real/piscina-instalacion.jpeg',
      specs: [
        { label: 'Refuerzo Perimetral', val: 'Acero estructural embutido' },
        { label: 'Curado', val: 'Horno térmico 45°C' },
        { label: 'Control Calidad', val: 'Espesor ultrasónico' },
        { label: 'Pestaña', val: 'Anti-derrames reforzada' }
      ]
    },
    {
      num: '04 / 06',
      title: 'Excavación Milimétrica y Cama de Gravilla',
      phase: 'Fase 04 · Topografía e Ingeniería de Suelo',
      desc: 'Trazado topográfico preciso y excavación con maquinaria oruga. Se instala una base de gravilla limpia compactada de 10 a 15 cm con pendiente cero perfecta para permitir drenaje subterráneo pasivo y evitar hundimientos.',
      image: 'assets/projects/pool-work.webp',
      specs: [
        { label: 'Base de Suelo', val: 'Gravilla 3/4" compactada' },
        { label: 'Nivelación', val: 'Láser rotativo milimétrico' },
        { label: 'Drenaje', val: 'Capa permeable activa' },
        { label: 'Tolerancia', val: '< 3 mm en nivel' }
      ]
    },
    {
      num: '05 / 06',
      title: 'Maniobra con Grúa Pluma e Instalación',
      phase: 'Fase 05 · Calce de Alta Precisión',
      desc: 'Transporte en camión cama baja e izaje con camión grúa pluma certificado. El casco se asienta en la fosa y se procede al llenado de agua en simultáneo con el relleno lateral de estabilizado seco para equilibrar presiones hidrostáticas.',
      image: 'assets/photography/route-installation.jpg',
      specs: [
        { label: 'Izaje', val: 'Grúa pluma con eslingas' },
        { label: 'Relleno', val: 'Estabilizado compensado' },
        { label: 'Contención', val: 'Llenado sincrónico' },
        { label: 'Asentamiento', val: 'Monitoreo dinámico' }
      ]
    },
    {
      num: '06 / 06',
      title: 'Conexión Hidráulica y Puesta en Marcha',
      phase: 'Fase 06 · Equipamiento y Entrega Oficial',
      desc: 'Montaje de tubería hidráulica de PVC cédula 40, bomba de recirculación Vulcano/Emaux, filtro de arena o vidrio bio-activo, foco LED subacuático estanco y tablero eléctrico con guardamotor e interruptor diferencial IP65.',
      image: 'assets/projects/pool-installed.webp',
      specs: [
        { label: 'Tuberías', val: 'PVC Hidráulico 50mm PN10' },
        { label: 'Filtración', val: 'Filtro Vulcano VC / Emaux' },
        { label: 'Iluminación', val: 'LED RGB Subacuático IP68' },
        { label: 'Tablero Eléctrico', val: 'Estanco IP65 certificado' }
      ]
    }
  ];

  function initPoolEngineering() {
    const nav = document.getElementById('pool-eng-nav');
    const stageMedia = document.getElementById('pool-eng-img');
    const stageNum = document.getElementById('pool-eng-num');
    const stagePhase = document.getElementById('pool-eng-phase');
    const stageTitle = document.getElementById('pool-eng-title');
    const stageDesc = document.getElementById('pool-eng-desc');
    const stageSpecs = document.getElementById('pool-eng-specs');

    if (!nav || !stageMedia) return;

    function renderStage(idx) {
      const p = poolPhases[idx];
      nav.querySelectorAll('.pool-eng-btn').forEach((btn, i) => {
        btn.classList.toggle('is-active', i === idx);
        btn.setAttribute('aria-pressed', String(i === idx));
      });
      stageMedia.src = p.image;
      stageNum.textContent = p.num;
      stagePhase.textContent = p.phase;
      stageTitle.textContent = p.title;
      stageDesc.textContent = p.desc;
      stageSpecs.innerHTML = p.specs.map(s => `
        <div class="pool-eng-spec-item">
          <strong>${s.label}</strong>
          <span>${s.val}</span>
        </div>
      `).join('');
    }

    nav.innerHTML = poolPhases.map((p, i) => `
      <button type="button" class="pool-eng-btn ${i === 0 ? 'is-active' : ''}" data-phase="${i}" aria-pressed="${i === 0}">
        ${p.title.split(' ')[0]} ${p.num.split(' ')[0]}
      </button>
    `).join('');

    nav.addEventListener('click', e => {
      const btn = e.target.closest('.pool-eng-btn');
      if (!btn) return;
      const idx = parseInt(btn.dataset.phase, 10);
      renderStage(idx);
    });

    renderStage(0);
  }

  // 3. Módulo Domótica e Inmótica: Pestañas Interactivas
  function initDomoticaTabs() {
    const buttons = document.querySelectorAll('.domotica-tab-btn');
    const panes = document.querySelectorAll('.domotica-tab-pane');
    if (!buttons.length) return;

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.dataset.domoticaTab;
        buttons.forEach(b => {
          b.classList.remove('is-active');
          b.setAttribute('aria-selected', 'false');
        });
        panes.forEach(p => p.classList.remove('is-active'));

        btn.classList.add('is-active');
        btn.setAttribute('aria-selected', 'true');
        const activePane = document.getElementById(targetId);
        if (activePane) activePane.classList.add('is-active');
      });
    });
  }

  // 4. Formulario con Despacho Oficial a ventas@jechman.cl
  function initContactFormUpgrade() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    // Configurar atributo nativo del form
    form.action = 'mailto:ventas@jechman.cl';
    form.method = 'POST';
    form.enctype = 'text/plain';

    function buildMailData() {
      const d = new FormData(form);
      const nombre = d.get('nombre') || '';
      const telefono = d.get('telefono') || '';
      const correo = d.get('correo') || '';
      const area = d.get('area') || '';
      const mensaje = d.get('mensaje') || '';

      let details = '';
      if (area === 'Piscinas y bienestar') {
        const type = document.getElementById('contact-pool-type')?.value || '';
        const size = document.getElementById('contact-pool-size')?.value?.trim() || '';
        if (type) details += `\n• Modelo deseado: ${type}`;
        if (size) details += `\n• Dimensiones estimadas: ${size}`;
      } else if (area === 'Electricidad') {
        const type = document.getElementById('contact-electric-type')?.value?.trim() || '';
        if (type) details += `\n• Tipo de proyecto: ${type}`;
      }

      const subject = `Solicitud de Cotización Web JECHMAN - ${area} - ${nombre}`;
      const body = `Estimado equipo JECHMAN Ingeniería y Construcción SpA:\n\nQuisiera solicitar una cotización formal a través de ventas@jechman.cl:\n\n• Cliente: ${nombre}\n• Teléfono de contacto: ${telefono}\n• Correo electrónico: ${correo}\n• Área: ${area}${details}\n\n• Requerimiento técnico:\n${mensaje}\n\nSolicito confirmación de factibilidad técnica, plazo estimado y propuesta formal.\n\nEnviado desde el portal web oficial https://www.jechman.cl/`;

      return { nombre, telefono, correo, area, mensaje, subject, body };
    }

    form.addEventListener('submit', e => {
      e.preventDefault();

      // Antispam: honeypot
      const hp = form.querySelector('[name="jechman_hp"]');
      if (hp && hp.value.trim()) return;

      // Rate limit
      const now = Date.now();
      const spamKey = 'jechman-last-submit';
      const lastSubmits = JSON.parse(sessionStorage.getItem(spamKey) || '[]').filter(t => now - t < 60000);
      if (lastSubmits.length >= 3) {
        document.getElementById('form-status').innerHTML = '<div class="notice">Demasiados intentos consecutivos. Por favor espera 1 minuto o escríbenos directamente a <a href="mailto:ventas@jechman.cl">ventas@jechman.cl</a>.</div>';
        return;
      }
      sessionStorage.setItem(spamKey, JSON.stringify([...lastSubmits, now]));

      if (!form.reportValidity()) return;

      const mail = buildMailData();
      const mailtoUrl = `mailto:ventas@jechman.cl?subject=${encodeURIComponent(mail.subject)}&body=${encodeURIComponent(mail.body)}`;

      // Lanzar mailto para abrir cliente de correo del usuario (Outlook / Apple Mail / Thunderbird)
      window.location.href = mailtoUrl;

      // Renderizar confirmación clara con respaldo de WhatsApp
      const statusBox = document.getElementById('form-status');
      const waMsg = `Hola JECHMAN, acabo de enviar mi cotización por correo a ventas@jechman.cl. Área: ${mail.area}. Nombre: ${mail.nombre}. Teléfono: ${mail.telefono}. Mensaje: ${mail.mensaje}`;
      const waUrl = `https://wa.me/56962306924?text=${encodeURIComponent(waMsg)}`;

      statusBox.innerHTML = `
        <div class="form-confirmation-card">
          <h4>✓ Tu solicitud ha sido preparada para ventas@jechman.cl</h4>
          <p>Se ha abierto tu aplicación de correo para enviar la cotización con todos los datos técnicos estructurados. Si tu cliente de correo no abrió automáticamente, puedes enviarlo directamente haciendo clic abajo o enviárnoslo por WhatsApp para una atención inmediata.</p>
          <div class="form-confirm-actions">
            <a class="btn btn-email-dispatch" href="${mailtoUrl}">
              Abrir Correo de Nuevo
            </a>
            <a class="btn btn-wa-dispatch" href="${waUrl}" target="_blank" rel="noopener noreferrer">
              Confirmar también por WhatsApp (+56 9 6230 6924)
            </a>
          </div>
        </div>
      `;
    });

    const waBtn = document.getElementById('btn-submit-wa');
    if (waBtn) {
      waBtn.addEventListener('click', () => {
        if (!form.reportValidity()) return;
        const mail = buildMailData();
        const waMsg = `Hola JECHMAN, quisiera solicitar una cotización formal.\nÁrea: ${mail.area}\nNombre: ${mail.nombre}\nTeléfono: ${mail.telefono}\nCorreo: ${mail.correo}\nMensaje: ${mail.mensaje}`;
        window.open(`https://wa.me/56962306924?text=${encodeURIComponent(waMsg)}`, '_blank', 'noopener,noreferrer');
      });
    }
  }

  // Inicializar al cargar el DOM o si ya cargó
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initSpotlight();
      initPoolEngineering();
      initDomoticaTabs();
      initContactFormUpgrade();
    });
  } else {
    initSpotlight();
    initPoolEngineering();
    initDomoticaTabs();
    initContactFormUpgrade();
  }
})();
