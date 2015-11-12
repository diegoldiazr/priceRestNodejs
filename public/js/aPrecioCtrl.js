var app = angular.module('app', []);

app.controller('aPrecioCtrl', function($scope, $http){

	//$scope.mensaje = "Mundo desde un controlador";
	$http.get('/data/precios.json')
		.success(function(data){

			$scope.precios = data;
			$scope.precio = data[0]._id;

						
		});
});