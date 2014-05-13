var AutorModel = Backbone.Model.extend({
	defaults: {
		id: null,
		nombre: '',
		descripcion: ''
	},

	urlRoot: '/autors',

	validate: function(autor){
		if(!autor.nombre){
			return 'El autor debe tener un nombre';
		}
	}
});