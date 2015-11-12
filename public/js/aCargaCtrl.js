var app = angular.module('app', []);

app.controller('aCargaCtrl', function($scope, $http){

	$http.get('/data/comercios.json')
		.success(function(data){
			$scope.comercios = data;
			$scope.comercio = data[0]._id;

			$scope.cargarJuegos();

			$scope.cargarPrecios();
		});

	$scope.cargarJuegos = function(){
		$http.get('/data/juegos.json')
			.success(function(data){
				$scope.juegos = data;
		});
	};

	$scope.cargarPrecios = function(){
		$http.get('/data/precios.json')
			.success(function(data){
				console.log(data);
				$scope.precios = data;
		});
	};
});