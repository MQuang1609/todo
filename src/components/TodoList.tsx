import { FormGroup, Input, InputBase, TextField } from "@mui/material"
import Button from "@mui/material/Button"
import FormControl from "@mui/material/FormControl"
import { useState, useEffect } from 'react'

interface IdataInput {
    name: String,
    age: String,
    height: String,
};
interface IdataArray {
    data: IdataInput[]
}


const arrayObject: IdataArray = {
    data: []
}
const objectData: IdataInput = {

    name: '',
    age: '',
    height: '',
};

const TodoList = () => {
    const [value, setValue] = useState<IdataInput>(objectData)
    const [valueInput, setValueInput] = useState<IdataInput[]>([])
    const [indexEdit, setIndexEdit] = useState<number>(-1)
    const [html, setHTML] = useState<any>([])
    const onChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const data: IdataInput = { ...value };
        switch (event.target.id) {
            case 'name':
                data.name = event.target.value;
                break;
            case 'age':
                data.age = event.target.value;
                break;
            case 'height':
                data.height = event.target.value;
                break;
            default:
                break;
        }
        console.log(event.target.value);
        setValue(data);
    }
    const onSubmit = (event: React.FormEvent<HTMLFormElement>, index: number) => {
        event.preventDefault()
        const data: IdataInput[] = [...valueInput];
        if (index > -1) {
            data[index].age = value.age;
            data[index].height = value.height;
            data[index].name = value.name;
            const button: HTMLElement | any = document.getElementById('edit-btn');
            button.innerText = 'Add';
            setIndexEdit(-1);
        }
        else {
            data.push(value);
        }
        setValueInput(data);
        setValue(objectData);
    }
    const onRemove = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const index: number = valueInput.findIndex(element => {
            return element.name === event.currentTarget.id;
        });
        if (index > -1) {
            const object: IdataInput[] = [...valueInput];
            object.splice(index, 1);
            setValueInput(object);
        }
    }
    const onEdit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        console.log(event.currentTarget)

        const index: number = valueInput.findIndex(element => {
            return element.name === event.currentTarget.id;
        })
        if (index > -1) {
            const objectEdit: IdataInput = valueInput[index];
            setValue(objectEdit);
            const button: HTMLElement | any = document.getElementById('edit-btn');
            button.innerText = 'Edit';
            setIndexEdit(index)

        }
        console.log(index)
    }

    useEffect(() => {
        const RenderData = () => {
            const value = valueInput.map((element) => {
                return <div key={String(element.name)}>
                    {String(element.age)} + {String(element.height)} + {element.name}
                    <Button color="inherit" id={String(element.name)} variant="outlined" onClick={(event) => { onEdit(event) }}>Edit</Button>
                    <Button color="error" variant="outlined" id={String(element.name)} onClick={(event) => { onRemove(event) }}>Remove</Button>
                </div>;
            })
            return value
        }
        setHTML(RenderData())
    }, [valueInput]);

    return (
        <div>
            <div>To Do App</div>
            <form onSubmit={(event) => { onSubmit(event, indexEdit) }}>
                <TextField placeholder="Con cho Hung" id="name" value={value.name} type="text" onChange={(event) => { onChange(event) }}></TextField>
                {/* <Input placeholder="Age" id="age" type="text" value={value.age} onChange={(event) => { onChange(event) }}></Input>
                <Input placeholder="Height" id="height" value={value.height} type="text" onChange={(event) => { onChange(event) }}></Input> */}
                <Button type="submit" id="edit-btn">Submit</Button>
            </form>
            {html}
        </div >
    )
}

export default TodoList