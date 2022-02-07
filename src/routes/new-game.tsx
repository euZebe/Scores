import * as React from "react"
import { useForm, useFieldArray } from "react-hook-form"
import {
  DragDropContext,
  Draggable,
  Droppable,
  DraggableProvided,
  DroppableProvided,
} from "react-beautiful-dnd"
import { createGame } from "../game"
import { useNavigate } from "react-router-dom"

type FieldValue = {
  value: string
}

const reorder = (list: any[], startIndex: number, endIndex: number) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

const NewGame = () => {
  const {
    control,
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: { gameName: "", playersNames: [] as FieldValue[] },
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: "playersNames", // unique name for your Field Array
  })

  let navigate = useNavigate()

  const onSubmit = async (formValues: any) => {
    console.log("submitting")
    await createGame({
      ...formValues,
      playersNames: formValues.playersNames.map((p: FieldValue) => p.value),
    })
    navigate("/")
  }

  const reorderPlayers = (result: any) => {
    if (!result.destination) {
      return
    }

    const items = reorder(
      getValues().playersNames,
      result.source.index,
      result.destination.index
    )
    setValue("playersNames", items)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Please fill new game props</h1>
      <div>
        <label htmlFor="gameName">Game name</label>
        <input type="text" {...register("gameName", { required: true })} />
        {errors.gameName && <span>This field is required</span>}
      </div>
      <div>
        <label htmlFor="playersNames">Players</label>
        <button type="button" onClick={() => append({ value: "" })}>
          Add player
        </button>
      </div>
      <DragDropContext onDragEnd={reorderPlayers}>
        <Droppable droppableId="droppable">
          {(provided: DroppableProvided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {fields.map((field, index) => (
                <Draggable key={field.id} draggableId={field.id} index={index}>
                  {(provided: DraggableProvided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      tabIndex={-1}
                    >
                      <input {...register(`playersNames.${index}.value`)} />
                      <span>ⅢⅢⅢⅢ</span>
                      <button onClick={() => remove(index)}>╳</button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <button style={{ display: "block" }}>Submit</button>
    </form>
  )
}

export default NewGame
