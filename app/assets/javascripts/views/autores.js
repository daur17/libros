var AutoresMainView = Backbone.View.extend({
	el: '.general-container',

	initialize: function(){
		autores.on('add change', this.showAutores);
		autores.fetch();
	},

	events: {
		'click #addAutorBtn' : 'addAutor',
		'submit #autorForm' : 'saveAutor',
		'click #showAutorBtn' : 'showDetailsAutor',
		'click #editAutorBtn' : 'editAutor',
		'click #deleteAutorBtn' : 'deleteAutor'
	},

	saveAutor: function(e){
		e.preventDefault();
		var form = $('#autorForm');
		var data = form.serializeArray();
		if(!data[0].value){
			var autor = new AutorModel({
				nombre: data[1].value,
				descripcion: data[2].value
			});
		}else{
			var autor = new AutorModel({
				id: data[0].value,
				nombre: data[1].value,
				descripcion: data[2].value
			});
		}

		if(autor.save()){
			$('#autorModal').modal('hide');
			form.trigger('reset');
			autores.fetch();
		}
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

	deleteAutor: function(e){
		var id = e.target.value;
		var modelo = autores.get(id);
		if(modelo.destroy()){
			$(e.target).parent().parent().fadeOut(400);
		}
	},

	showAutores: function(modelo){
		var vista = new showAutoresView({model:modelo});
		$('.lista-autores').append(vista.$el).hide().fadeIn(300);
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