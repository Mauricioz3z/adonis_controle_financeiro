'use strict'
let { validateAll } = use('Validator')
const Despesa = use('App/Models/Despesa')
const Database = use('Database')
class DespesaController {



async  getgraficoMes({response}) {
    // await Database.raw('select * from users where username = ?', [username])
    let responseData=await Database.raw('SELECT SUM(despesas.valor) as valor, DATE_FORMAT(despesas.data, "%M") Months FROM despesas GROUP BY Months ORDER by DATE_FORMAT(despesas.data, "%m");')
    return response.send(JSON.parse(JSON.stringify(responseData))[0])
}

  async  despesaGet({ view, params }) {
      if(params.id){
        const despesa = await Despesa.find(params.id)
        return view.render('despesa_add',{despesa:despesa.toJSON()})
      }
        const listaDespesas = await Despesa.all()
        return view.render('despesa',{listaDespesas:listaDespesas.toJSON()})
    }

    async  despesaAddGet({ view }) {

        return view.render('despesa_add')
    }

    // const despesa = await Despesa.find(id)
    


    

   async despesaPost({ view, request, session, response }) {
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
            return view.render('despesa_add',{descricao:data.descricao,valor:data.valor,data:data.data,observacoes:data.observacoes})
            // return response.redirect('back')
        }
       
        var  valoraux= request.input('valor').replace(/\./g, "");
        valoraux=valoraux.replace(/,/g, '.')
        var dataaux= request.input('data').split('/')
        dataaux=dataaux[2]+'-'+dataaux[1]+'-'+dataaux[0]
        const despesa = new Despesa();
        despesa.descricao = request.input('descricao')
        despesa.valor  =valoraux
        despesa.data = dataaux
        despesa.observacoes = request.input('observacoes')

        try {
            await Despesa.save();
            session.flash({ notification: 'Cadastro realizado com sucesso!' })
            console.log('Salvou.......')
            return response.redirect('back')
        } catch (error) {
            console.log('Erro ao salvar',error)
            // session.flash({ notification: 'Algo deu errado',datakepper: {username:data.name,email:data.email} })
            return view.render('despesa_add',{descricao:data.descricao,valor:data.valor,data:data.data,observacoes:data.observacoes})
            // return response.redirect('back')
        }
        
        
    }


  async  despesaPut({ view, request, session, response,params }){
    const data = request.only(['despesa_id','descricao', 'valor', 'data','observacoes'])

            

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
            return view.render('despesa_add',{descricao:data.descricao,valor:data.valor,data:data.data,observacoes:data.observacoes})
            // return response.redirect('back')
        }
        const despesa = await Despesa.find(data.despesa_id)
        despesa.descricao =data.descricao
        despesa.valor=data.valor
        despesa.data=data.data
        despesa.observacoes=data.observacoes
       

        try {
             // Update
            await Despesa.save()
            session.flash({ notification: 'Dados atualizado!' })
            console.log('Salvou.......')
            return response.redirect('back')
        } catch (error) {
            console.log('Erro ao salvar',error)
            // session.flash({ notification: 'Algo deu errado',datakepper: {username:data.name,email:data.email} })
            return view.render('despesa_add',{descricao:data.descricao,valor:data.valor,data:data.data,observacoes:data.observacoes})
            // return response.redirect('back')
        }

    }

   async delete ({ view, request, session, response }){
    const data = request.only(['despesa_id'])
    console.log(data);
    
    try {

        const despesa = await Despesa.find(data.despesa_id)
        await Despesa.delete()

        session.flash({ notification_delete: 'Item excuído com sucesso!'})
        console.log('Salvou.......') 
        return response.redirect('back')
    } catch (error) {
        console.log('Erro ao salvar',error)
        return response.redirect('back')
        // return view.render('despesa',{descricao:data.descricao,valor:data.valor,data:data.data,observacoes:data.observacoes})
        
    }
   }
}

module.exports = DespesaController
