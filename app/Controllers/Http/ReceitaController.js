'use strict'
let { validateAll } = use('Validator')
const Receita = use('App/Models/Receita')
const Database = use('Database')
class ReceitaController {



async  getgraficoMes({response}) {
    // await Database.raw('select * from users where username = ?', [username])
    let responseData=await Database.raw('SELECT SUM(receitas.valor) as valor, DATE_FORMAT(receitas.data, "%M") Months FROM receitas GROUP BY Months ORDER by DATE_FORMAT(receitas.data, "%m");')
    return response.send(JSON.parse(JSON.stringify(responseData))[0])
}

  async  receitaGet({ view, params }) {
      if(params.id){
        const receita = await Receita.find(params.id)
        return view.render('receita_add',{receita:receita.toJSON()})
      }
        const listaReceitas = await Receita.all()
        return view.render('receita',{listaReceitas:listaReceitas.toJSON()})
    }

    async  receitaAddGet({ view }) {

        return view.render('receita_add')
    }

    // const receita = await receita.find(id)
    


    

   async receitaPost({ view, request, session, response }) {
        const data = request.only(['descricao', 'valor', 'data','observacoes'])
        const rules = {
            descricao: 'required',
            valor: 'required',
            data: 'required',
        }

        const messages = {
            'descricao.required': 'Informe a decrição!',
            'valor.required': 'Informe o valor!',
            'data.required': 'Informe a data!'
  
        }

        const validation = await validateAll(data, rules, messages);

        if (validation.fails()) {
            session.withErrors(validation.messages()).flashExcept(['observacoes'])
            // session.flash({ notification: 'Algo deu errado',datakepper: {username:data.name,email:data.email} })
            return view.render('receita_add',{descricao:data.descricao,valor:data.valor,data:data.data,observacoes:data.observacoes})
            // return response.redirect('back')
        }
       
        var  valoraux= request.input('valor').replace(/\./g, "");
        valoraux=valoraux.replace(/,/g, '.')
        var dataaux= request.input('data').split('/')
        dataaux=dataaux[2]+'-'+dataaux[1]+'-'+dataaux[0]
        const receita = new Receita();
        receita.descricao = request.input('descricao')
        receita.valor  =valoraux
        receita.data = dataaux
        receita.observacoes = request.input('observacoes')

        try {
            await receita.save();
            session.flash({ notification: 'Cadastro realizado com sucesso!' })
            console.log('Salvou.......')
            return response.redirect('back')
        } catch (error) {
            console.log('Erro ao salvar',error)
            // session.flash({ notification: 'Algo deu errado',datakepper: {username:data.name,email:data.email} })
            return view.render('receita_add',{descricao:data.descricao,valor:data.valor,data:data.data,observacoes:data.observacoes})
            // return response.redirect('back')
        }
        
        
    }


  async  receitaPut({ view, request, session, response,params }){
    const data = request.only(['receita_id','descricao', 'valor', 'data','observacoes'])

            

        const rules = {
            descricao: 'required',
            valor: 'required',
            data: 'required'
        }

        const messages = {
            'descricao.required': 'Informe a decrição!',
            'valor.required': 'Informe o valor!',
            'data.required': 'Informe a data!'
        }

        const validation = await validateAll(data, rules, messages);

        if (validation.fails()) {
            session.withErrors(validation.messages()).flashExcept(['observacoes'])
            // session.flash({ notification: 'Algo deu errado',datakepper: {username:data.name,email:data.email} })
            return view.render('receita_add',{descricao:data.descricao,valor:data.valor,data:data.data,observacoes:data.observacoes})
            // return response.redirect('back')
        }
        const receita = await receita.find(data.receita_id)
        receita.descricao =data.descricao
        receita.valor=data.valor
        receita.data=data.data
        receita.observacoes=data.observacoes
       

        try {
             // Update
            await receita.save()
            session.flash({ notification: 'Dados atualizado!' })
            console.log('Salvou.......')
            return response.redirect('back')
        } catch (error) {
            console.log('Erro ao salvar',error)
            // session.flash({ notification: 'Algo deu errado',datakepper: {username:data.name,email:data.email} })
            return view.render('receita_add',{descricao:data.descricao,valor:data.valor,data:data.data,observacoes:data.observacoes})
            // return response.redirect('back')
        }

    }

   async delete ({ view, request, session, response }){
    const data = request.only(['receita_id'])
    console.log(data);
    
    try {

        const receita = await receita.find(data.receita_id)
        await receita.delete()

        session.flash({ notification_delete: 'Item excuído com sucesso!'})
        console.log('Salvou.......') 
        return response.redirect('back')
    } catch (error) {
        console.log('Erro ao salvar',error)
        return response.redirect('back')
        // return view.render('receita',{descricao:data.descricao,valor:data.valor,data:data.data,observacoes:data.observacoes})
        
    }
   }
}

module.exports = ReceitaController




