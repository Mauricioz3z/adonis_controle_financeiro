'use strict'

const Route = use('Route')

Route.on('/').render('dashboard')

/*Despesas*/
Route.get('/nova-despesa','DespesaController.despesaAddGet')
Route.get('/despesas','DespesaController.despesaGet')
Route.get('/despesa/:id','DespesaController.despesaGet')
Route.post('/despesa','DespesaController.despesaPost')
Route.put('/despesa','DespesaController.despesaPut')
Route.delete('/despesa','DespesaController.delete')
Route.get('/get-grafico','DespesaController.getgraficoMes')
/*Despesas*/

/*Receitas */
Route.get('/nova-receita','ReceitaController.receitaAddGet')
Route.get('/receitas','ReceitaController.receitaGet')
Route.get('/receita/:id','ReceitaController.receitaGet')
Route.post('/receita','ReceitaController.receitaPost')
Route.put('/receita','ReceitaController.receitaPut')
Route.delete('/receita','ReceitaController.delete')
Route.get('/get-grafico-receitas','ReceitaController.getgraficoMes')
/*Receitas */


Route.get('/register','UserController.registerGet')
Route.post('/register','UserController.registerPost')

Route.get('/login','UserController.loginGet')
Route.post('/login','UserController.loginPost')
// .middleware(['auth'])
Route.get('/profile','UserController.profileGet').middleware(['authenticated'])
Route.put('/profile','UserController.profilePut').middleware(['authenticated'])



 
 