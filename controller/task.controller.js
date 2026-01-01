const Task = require("../model/task.model.js");


async function handleTaskCreation(request, response) {
    const { title, description, duedate, status, priority } = request.body;

    if (!title || !description || !duedate || !status || !priority) {
        return response.status(400).json({ message: "All fields are required" });
    }

    const isTaskExist = await Task.findOne({ title }); // use findOne, not findById
    if (isTaskExist) {
        return response.status(400).json({ message: "Task already exists" });
    }

    const newTask = new Task({ title, description, dueDate: duedate, status, priority });
    await newTask.save(); // use save or create

    return response.status(200).json({ message: "Task created successfully" });
}
   
async function handleTaskDeletion(request,response){
    const {id} = request.body;
    if(!id) return response.status(400).json({message:"id is missing "});
    
    const task = await Task.findByIdAndDelete(id);
    if (!task) return response.status(404).json({ message: "Task not found" });

    return response.status(200).json({message:"Task deleted successfully"});
}

async function handleTaskUpdation(request,response){
    const {id, ...updateData} = request.body;
    if(!id) return response.status(400).json({message:"Id is missing"});

    const task = await Task.findByIdAndUpdate(id, updateData, { new: true });
    if(!task) return response.status(404).json({ message: "Task not found" });

    return response.status(200).json({ message: "Task updated successfully", task });
}

async function handleGetAllTask(request,response) {
    const tasks = await Task.find();
    return response.status(200).json(tasks);
}
 
module.exports = {handleGetAllTask,handleTaskCreation,handleTaskDeletion,handleTaskUpdation};