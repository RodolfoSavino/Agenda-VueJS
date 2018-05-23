const STORAGE_KEY = 'personas-storage';


var app = new Vue({
  	  el: '#app',
  	  data: {
  	    persona: {
          id: 0,
          nombre: '',
          apellido:'',
          telefono: '',
          mail:'',
          genero:'',
          favorito: false,
          grupo:''
  	    },
  	    personas: [],
  	    filtro: '',
  	    vista: 'ingresar',
  	    mensaje: false,
        mensajePersonaEliminada: false,
        mensajePersonaEditada: false,
        indicePersona: '',
        dismissSecs: 2,
        dismissCountDown: 0,
        showDismissibleAlert: false
  	  },


  	  //filtra personas para retornarlas
  	  computed: {
  	  	personasFiltradas() {
          return this.personas.filter(p => p.nombre.toLowerCase().indexOf(this.filtro.toLowerCase()) >= 0 ||
            p.apellido.toLowerCase().indexOf(this.filtro.toLowerCase()) >= 0 ||
            p.telefono.indexOf(this.filtro) >= 0 ||
            p.mail.toLowerCase().indexOf(this.filtro.toLowerCase()) >= 0 ||
            p.grupo.toLowerCase().indexOf(this.filtro.toLowerCase()) >= 0 ||
            p.genero.toLowerCase().indexOf(this.filtro.toLowerCase()) >= 0);
        
  	  	},
  	  	//filtra personas favoritas
        contactosFavoritos(){
          return this.personas.filter(p => p.favorito == true);
        },

        //retonar la persona sólo si tiene los requerimientos
  	  	formOk() {
  	  		return this.persona.nombre 
          && this.persona.apellido 
          && this.persona.telefono
          && this.persona.genero;
  	  	}
  	  },

  	  // Crea lista para guardar en Local Storage
      created(){
        this.personas = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      },


  	  methods: {
  	  	agregarPersona() {
  	  		this.personas.push(Object.assign({}, this.persona));
          id=this.personas.length;
  	  		this.limpiarPersona();
  	  		this.mensaje = true;
          localStorage.setItem(STORAGE_KEY, JSON.stringify(this.personas));

  	  	},
  	  	//limpia los textboxs después de agregar
  	  	limpiarPersona() {
  	  		this.persona.nombre = '';
          this.persona.apellido = '';
  	  		this.persona.telefono = '';
          this.persona.mail = '';
          this.persona.genero = '';
          this.persona.grupo='';
  	  	},
  	  	//cambia las vistas de los menú
  	  	cambiarVista(vista) {
  	  		this.vista = vista;
  	  	},
  	  	cerrarMensaje() {
  	  		this.mensaje = false;
  	  	},

  	  	//elimina personas y lo guarda en el LS
        eliminarPersona: function(persona) {
          this.personas.splice(this.personas.indexOf(persona), 1);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(this.personas));
          
        },

        //abre un nuevo formulario para modificar la persona
        abrirFormularioEditarPersona(persona){
          this.indicePersona = this.personas.indexOf(persona);
          this.cambiarVista("modificar");
          this.persona.nombre = this.personas[this.indicePersona].nombre;
          this.persona.apellido = this.personas[this.indicePersona].apellido;
          this.persona.telefono = this.personas[this.indicePersona].telefono;
          this.persona.mail = this.personas[this.indicePersona].mail;
          this.persona.genero = this.personas[this.indicePersona].genero;
          this.persona.grupo = this.personas[this.indicePersona].grupo;
        },

        //guarda la persona editada en LS y cambia la vista
        editarPersona(){
          this.personas.splice(this.indicePersona, 1, Object.assign({}, this.persona));
          localStorage.setItem(STORAGE_KEY, JSON.stringify(this.personas));
          this.cambiarVista("buscar");
          this.limpiarPersona();
          this.indicePersona = '';
          this.mensajePersonaEditada = true;
        },
        
        countDownChanged(dismissCountDown) {
          this.dismissCountDown = dismissCountDown;
        },

        estadoFavorito: function(persona) {
            this.persona.favorito = persona.favorito;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.personas));
        },

        //Alerta cuando se agrega una persona
        showAlert() {
          this.dismissCountDown = this.dismissSecs;
        },

    }
  })
