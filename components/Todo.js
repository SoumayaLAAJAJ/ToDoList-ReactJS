import React, { useState, useEffect } from 'react'
import Task from './Task'



function Todo() { 

    const [input, setInput] = useState('');
    const [tasks, setTasks] = useState([]);

    // const [items, setItems] = useState([]);

    // useEffect(() => {
    // localStorage.setItem('items', JSON.stringify(items));
    // }, [items]);

    // useEffect(() => {
    //     const items = JSON.parse(localStorage.getItem('items'));
    //     if (items) {
    //      setItems(items);
    //     }
    //   }, []);
    // const [editing, setEditing] = useState(false);

    // useEffect(() => {
    //     setTasks(window.localStorage.getItem('tasks'));
    //   }, []);
    
    //   useEffect(() => {
    //     window.localStorage.setItem('tasks', tasks);
    //   }, [tasks]);

    // première fonction qui est lue par le navigateur (après le composant)
    useEffect(() => {
        // 
        const items = localStorage.getItem('tasks');
        if (items) {
        //  
            setTasks(JSON.parse(items));
        }else{

            setTasks([]);
        }
    }, []);


    //   useEffect(() => {
    //     const tasks = JSON.parse(localStorage.getItem('tasks'));
    //     if (tasks) {
    //      setTasks(tasks);
    //     }
    //   }, []);

    const handleSubmit = (e) => {
        // pour que le form ne refresh pas la page à chaque fois qu'on appuie sur submit
        e.preventDefault();
        // les '...' s'appellent le spread operateur. Il permet de récupérer ce qui est déjà dans le tableau et de reproduire un nouveau tableau à chaque fois qu'une valeur est ajoutée afin de remplacer le précédent
        setTasks([...tasks,input]);
        // ------- LOCAL STORAGE ------------------
        // il faut passer par une variable intermédiaire car les temps de rechargement sont trop rapides
        const saveData = [...tasks,input]
        localStorage.setItem('tasks', JSON.stringify(saveData));
        setInput('');

    }

    // ---------------CRUD : Delete --------------
    // Pour supprimer, on fait de l'inverse data flow car les constantes dont on a besoin dans l'enfant (tasks, setTasks) sont dans le parent
    const deleteTask = (name) => {
        const arrayWithRemovedItem = tasks.filter(e => e !== name);
        setTasks(arrayWithRemovedItem);
        console.log(tasks.filter(e => e !== name));
        // const deletedItem = name;
        localStorage.setItem('tasks', JSON.stringify(arrayWithRemovedItem));
        
    }

    // const handleEditing = () => {
    //     console.log('edit0,', editing);
    //     setEditing(!editing);
    //     console.log('edit2,', editing);
    
    // };

    // function update(a,b) {
    //     console.log(tasks);
    //     let index = tasks.indexOf(a);
    //     const essai = tasks[index] = b;
    //     console.log('ESSAI',essai);
    //     const h = tasks;
    //     // const newTasks = tasks.splice(index, 1, b);
    //     // setTasks(h);
    //     console.log('tasks',h);
    // }



    //  ------------- CRUD : Update -------------
    // la fonction update prend taskName et newInput 
    function update(oldTask, newTask) {
        // on récupère l'index de notre ancienne task (celle à modifier)
        let index = tasks.indexOf(oldTask);
        // on redéfinie l'intégralité du tableau tasks avec le setTacks en reprenant le tableau de base renommé ici 'original'
        setTasks((original) => {
            // On map sur notre ancien tableau (ici appelé original) dans une nouvelle const newArray 
            // Le map prend comme paramètres chaque élement du tableau pour les traiter individuellement (task) et un index key (i)
            const newArray = original.map((task, i) => {
                // Compare le key avec l'index de l'ancienne tache 
                if(i === index){
                    // et lorsque la condition est vérifiée, il change le texte de l'ancienne tache (task) par celui de la nouvelle tache (newInput <=> paramètre newTask)
                    task = newTask;
                }
// Vu que c'est un map, il va retourner ce qu'il vient d'être vérifier/modifier
                return task;
            });
            const newArrayWithUpdatedData = newArray;
            localStorage.setItem('tasks', JSON.stringify(newArrayWithUpdatedData));
            // console.log('new array dans le setTasks avant le return',newArray);
            // a l'intérieur du setTasks on retourne le newArray <=> tasks devient newArray
            return newArray;
        });


    }


// On prend chacune de nos taches, on passe dessus pour les afficher avec le composant Task qui contient chaque tache individuel
    const taskList = tasks.map((task, i) => {
        //console.log('TASK', task)
        // 'taskname' est l'élement qui sera repris dans le composant Task en tant que props
        return(<Task key={i} update={update} taskName={task} /*tasks={tasks} setTasks={setTasks}*/ deleteTask={deleteTask} /*handleEditing={handleEditing} editing={editing}*/ />)
    })
//console.log(taskList);



    // console.log(taskList);

    function onChange(e){
        setInput(e.target.value);
    }


    return (
    <div className="TodoList">
        <h1>To-do List </h1>
        <ul>
            {/* on affiche la variable dans lequel on a fait le map afin d'afficher autant de composant Task qu'on a présent dans notre tableau tasks */}
        {taskList}
        </ul>
        <form className="NewTodoForm" onSubmit={handleSubmit}>
        <label>New todo</label>
        <input
            value={input}
            onChange={onChange}
            placeholder="New Todo"
        />
        <button type="submit">Add Todo</button>
        </form>
        
    </div>
)
}

export default Todo