var bodyParser = require('body-parser')
var mongoose = require('mongoose')

//Connect To The Database
mongoose.connect("<url>", {useUnifiedTopology: true,
                                                                                                              useNewUrlParser: true,}).then(() => console.log('DB Connected!'))
                                                                                                              .catch(err => {
                                                                                                                   console.log('DB Connection Error: ' + err)
                                                                                                              })

//Create A Schema- This is like a blueprint 
var todoSchema = new mongoose.Schema({
    item: String
})

//create A Model
var Todo = mongoose.model('Todo', todoSchema)

//var data = [{item: 'get milk'},
//            {item: 'walk dog'},
//            {item: 'kick some coding ass'}]
var urlencodedParser = bodyParser.urlencoded({extended: false})

module.exports = function(app){

    app.get('/todo', function(req, res){
        //get data from mongodb and pass it to view
        Todo.find({}, function(err, data){
            if(err) throw err
            res.render('todo', {todos: data})
        })
    })

    app.post('/todo', urlencodedParser, function(req, res){
        //get data from the view and add it to mongodb
        var newTodo = Todo(req.body).save(function(err, data){
            if(err) throw err
            res.json({todos: data})
        })
    })

    app.delete('/todo/:item', function(req, res){
        //delete the requested item from mongodb
        Todo.find({item: req.param.item.replace(/\-/g, " ")}).remove(function(err, data){
            if(err) throw err
            res.json({todos: data})
        })

    })

}
