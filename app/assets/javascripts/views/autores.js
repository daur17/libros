var AutoresMainView = Backbone.View.extend({
	el: '.general-container',

	initialize: function(){
		autores.on('add', this.showAutores);
		autores.fetch();
	},

	events: {
		'click #addAutorBtn' : 'addAutor',
		'submit #autorForm' : 'saveAutor',
		'click #showAutorBtn' : 'showDetailsAutor',
		'click #editAutorBtn' : 'editAutor'
	},

	saveAutor: function(e){
		e.preventDefault();
		var form = $('#autorForm');
		var data = form.serializeArray();
		var autor = new AutorModel({
			nombre: data[0].value,
			descripcion: data[1].value
		});

		if(autor.save()){
			form.trigger('reset');
			autores.fetch();
			$('#addAutorModal').modal('hide');
		}
		console.log(autor);
	},

	showDetailsAutor: function(e){
		var id = e.target.value;
		var modelo = autores.get(id);
		var vista = new showDetailsAutorView({model:modelo});
		$('#details-autor').html(vista.$el);
	},

	addAutor: function(){
		var modelo = new AutorModel();
		var vista = new autorFormView({model:modelo});
		$('#autorForm .modal-body').html(vista.$el);
	},

	editAutor: function(e){
		var id = e.target.value;
		var modelo = autores.get(id);
		var vista = new autorFormView({model:modelo});
		$('#autorForm .modal-body').html(vista.$el);
	},

	showAutores: function(modelo){
		var vista = new showAutoresView({model:modelo});
		$('.lista-autores').append(vista.$el);
	}

});

var showAutoresView = Backbone.View.extend({
	tagName: 'tr',

	initialize: function(){
		this.template = _.template($('#tplShowAutores').html());
		this.render();
	},

	render: function(){
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});


var showDetailsAutorView = Backbone.View.extend({
	
	initialize: function(){
		this.template = _.template($('#tplShowDetailsAutor').html());
		this.render();
	},

	render: function(){
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});

var autorFormView = Backbone.View.extend({
	initialize: function(){
		this.template = _.template($('#tplAutorForm').html());
		this.render();
	},

	render: function(){
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});

