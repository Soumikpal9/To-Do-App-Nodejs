var bodyParser = require('body-parser')
var mongoose = require('mongoose')

//Connect To The Database
mongoose.connect("mongodb+srv://test:test@todo.x6opt.mongodb.net/todo?retryWrites=true&w=majority&tls=true", {useUnifiedTopology: true,
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
var itemOne = Todo({item: 'buy flowers'}).save(function(err){
    if(err) throw err
    console.log('item saved')
})

var data = [{item: 'get milk'},
            {item: 'walk dog'},
            {item: 'kick some coding ass'}]
var urlencodedParser = bodyParser.urlencoded({extended: false})

module.exports = function(app){

    app.get('/todo', function(req, res){
        res.render('todo', {todos: data})
    })

    app.post('/todo', urlencodedParser, function(req, res){
        data.push(req.body)
        res.json({todos: data})
    })

    app.delete('/todo/:item', function(req, res){
        data = data.filter(function(todo){
            return todo.item.replace(/ /g, '-') !== req.params.item
        })
        res.json({todos: data})
    })

}