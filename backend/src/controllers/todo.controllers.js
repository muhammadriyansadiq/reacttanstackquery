// import Usertodo from "../modals/todo.js";
// const handletodo = async (req, res) =>{

//     const {  text } = req?.body;
//     console.log("reqbody",text)
//     const payload = await Usertodo.create({
//        text:text
//       });

// return res.json({msg:"running todo backend",payload})

// }


// const handletodoget = async (req, res) =>{

//  const payload = await Usertodo.find()
//  console.log("get",payload)
//  if(!payload.length) return res.status(400).json({error: "data not found"})

// return res.json({msg:payload})

// }

// const handletododel = async (req, res) =>{
//     console.log("del chal raha hai")
//     try {
//         const { id } = req.params;
//         await Usertodo.findByIdAndDelete(id);
//         res.status(204).json({ message: "Todo deleted" });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// }


// const handletodoput = async (req, res) =>{
//     try {
//         const { id } = req.params;
//         const todo = await Usertodo.findByIdAndUpdate(id, req.body, { new: true });
//         res.status(200).json({msg:todo});
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// }

// export{
//     handletodo,
//     handletodoget,
//     handletodoput,
//     handletododel

// }

import Usertodo from "../modals/todo.js";

// POST - Add new todo
const handletodo = async (req, res) => {
    const { newTodo } = req.body;
    console.log("post req",newTodo)
    try {
        const newTodoo = await Usertodo.create({ text: newTodo });
        return res.status(201).json({ message: 'Todo created successfully',payload:newTodoo });
    } catch (error) {
        return res.status(500).json({ message: 'Error creating todo', error });
    }
};

// GET - Retrieve all todos
const handletodoget = async (req, res) => {
  try {
    const payload = await Usertodo.find();
    if (!payload.length) return res.status(400).json({ error: "No todos found" });
    return res.json({ msg: payload });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// DELETE - Delete a todo
    const handletododel = async (req, res) => {
    try {
        const { id } = req.params;
        await Usertodo.findByIdAndDelete(id);
        res.status(204).json({ message: "Todo deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    };

// PUT - Update a todo
const handletodoput = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Usertodo.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ msg: todo });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export {
  handletodo,
  handletodoget,
  handletodoput,
  handletododel
};
