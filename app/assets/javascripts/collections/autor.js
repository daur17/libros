var AutorCollection = Backbone.Collection.extend({
	model: AutorModel,
	url: '/autors'
});

var autores = new AutorCollection();