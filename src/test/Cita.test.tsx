import { fireEvent, screen, act } from "@testing-library/react";
import Cita from "../features/quote/Cita"
import { crender } from "../test-utils"
import userEvent from '@testing-library/user-event'

describe("Cita", ()=>{

    describe("default", ()=>{
        it( "Debería mostrar el mensaje 'no hay cita'", ()=>{
        crender(<Cita/>)
        expect(screen.getByText("No se encontro ninguna cita")).toBeInTheDocument()
        })

    })

    describe("Valores validos", ()=>{
        it( "Debería mostrar una nueva cita de 'marge'", async()=>{
            crender(<Cita/>)
            const inputChar = screen.getByPlaceholderText("Ingresa el nombre del autor")
            const getQuote = screen.getByLabelText("Obtener cita aleatoria")
            act(() => {
                fireEvent.change(inputChar, {target: {value:"marge"}})
                userEvent.click(getQuote)
                /* fire events that update state */
            });
            expect( await screen.findByText("Marge Simpson")).toBeInTheDocument()
           
        })

    })

    describe("Ingresar valores invalidos", ()=>{
        it( "Debería mostrar un mensaje de personaje invalido", async()=>{
            crender(<Cita/>)
            const inputChar = screen.getByPlaceholderText("Ingresa el nombre del autor")
            const getQuote = screen.getByLabelText("Obtener cita aleatoria")
            act(() => {
                fireEvent.change(inputChar, {target: {value:"ramon"}})
                userEvent.click(getQuote)
                /* fire events that update state */
               });
            expect( await screen.findByText("Por favor ingrese un nombre válido")).toBeInTheDocument()
        })

    })

    describe("Cita aleatoria", ()=>{
        it( "Debería mostrar una cita aleatoria", async ()=>{
            crender(<Cita/>)
            const getQuote = screen.getByLabelText("Obtener cita aleatoria")
            userEvent.click(getQuote)
            expect( await screen.findByText("Mayor Quimby")).toBeInTheDocument()
        })

    })

    describe("Borrar", ()=>{
        it( "Debería mostrar el mensaje 'no hay cita' después de hacer click en el botón 'Borrar'", async ()=>{
            crender(<Cita/>)
            const getQuote = screen.getByLabelText("Obtener cita aleatoria")
            const clean = screen.getByLabelText("Borrar")
            userEvent.click(getQuote)
            expect( await screen.findByText("Mayor Quimby")).toBeInTheDocument()
            userEvent.click(clean)
            expect(await screen.findByText("No se encontro ninguna cita")).toBeInTheDocument()

        })

    })
})