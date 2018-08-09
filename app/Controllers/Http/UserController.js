'use strict'
let { validateAll } = use('Validator')
const User = use('App/Models/User')
const Hash = use('Hash')
class UserController {

    registerGet({ view }) {
        return view.render('register')
    }

    async registerPost({ request, session, response }) {
        // mensagens customizadas
        const data = request.only(['name', 'email', 'password'])

        const rules = {
            name: 'required|unique:users,username',
            email: 'required|email|unique:users,email',
            password: 'required'
        }

        const messages = {
            'name.required': 'Informe seu nome!',
            'name.unique': 'Nome já resgistrado!',
            'email.required': 'Informe seu e-mail!',
            'email.email': 'informe um e mail válido!',
            'email.unique': 'E-mail  já registrado!',

            'password.required': 'Informe uma senha',
        }

        const validation = await validateAll(data, rules, messages)

        // validate form inputs
        // const validation = await validateAll(request.all(), {
        //   name: 'required|unique:users,username',
        //   email: 'required|email|unique:users,email',
        //   password: 'required'
        // })

        if (validation.fails()) {
            session.withErrors(validation.messages()).flashExcept(['password'])
            session.flash({ notification: 'Algo deu errado',datakepper: {username:data.name,email:data.email} })
            return response.redirect('back')
        }

        const user = new User();
        user.username = request.input('name')
        user.email = request.input('email')
        /*por algum motivo o mysql se acontecer do input vir  'undefined' o mysql aceita o dado como vazio e insere
        mesmo estando com o campo password notnull fiz uma verificação caso i campo venha 'undefined' por algum motivo*/
        user.password = request.input('password') == undefined ? null : request.input('password');

        try {
            await user.save();
            session.flash({ notification: 'Cadastro realizado com sucesso!' })
            return response.redirect('back')
        } catch (error) {
          
            session.flash({ notification: 'Algo deu errado',datakepper: {username:data.name,email:data.email} })
            return response.redirect('back')
        }

    }

   async loginGet({ view,auth }) {
        await auth.logout()
        return view.render('login')
    }

    async loginPost({ request, auth, session, response}) {
        // mensagens customizadas
        const data = request.only(['email', 'password','remember'])
        // var remember= request.input('remember')=undefined?false:true;
            
        const rules = {
            email: 'required|email',
            password: 'required'
        }

        const messages = {
            'email.required': 'Informe seu e-mail!',
            'password.required': 'Informe uma senha',
        }

        const validation = await validateAll(data, rules, messages)


        if (validation.fails()) {
            session.withErrors(validation.messages()).flashExcept(['password'])
            return response.redirect('back')
        }

        // retrieve user base on the form data
            const user = await User.query()
            .where('email', request.input('email'))
            .first()

            if (user) {
                // verify password
                const passwordVerified = await Hash.verify(request.input('password'), user.password)
          
                if (passwordVerified) {
                  // login user
                        //se não for indefinido
                  await auth.remember(!!request.input('remember')).login(user)
          
                  return response.route('/')
                }
              }
          
              // display error message
              session.flash({
                notification:'Usuário ou senha incorretos'
              })
          
              return response.redirect('back')

    }

    async  profileGet({view,auth}){
      let user=  await auth.getUser()
        
        return  view.render('profile',{user:user})
        
    }

    async  profilePut({auth,request, session, response}){
    
        let userSession=  await auth.getUser()  
           // mensagens customizadas
        const data = request.only(['name', 'email', 'password'])

  
            const rules = {
            name: `required|unique:users,username,id,${userSession.id}`,
            email: `required|email|unique:users,email,id,${userSession.id}`,
            password: 'required'
        }
        
        const messages = {
            'name.required': 'Informe seu nome!',
            'name.unique': 'Nome já resgistrado!',
            'email.required': 'Informe seu e-mail!',
            'email.email': 'informe um e mail válido!',
            'email.unique': 'E-mail  já registrado!',
            'password.required': 'Informe uma senha',
        }

        const validation = await validateAll(data, rules, messages)

  

        if (validation.fails()) {
            session.withErrors(validation.messages()).flashExcept(['password'])
            return response.redirect('back')
        }
        
        const user = new User();
       
       
        user.username = request.input('name')
        user.email = request.input('email')
        user.password = request.input('password') == undefined ? null : request.input('password');
        user.fill({ id: userSession.id }) // remove existing values, only set age.
        try {
            await user.save();
            session.flash({ notification: 'Cadastro realizado com sucesso!' })
            return response.redirect('/profile')
        } catch (error) {
            console.log(error.getMessage());
            
            session.flash({ notification: 'Algo deu errado' })
            return response.redirect('back')
        }
          
      }

}

module.exports = UserController


