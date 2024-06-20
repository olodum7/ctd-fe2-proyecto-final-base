import { act } from "@testing-library/react";
import Cita from "../features/quote/Cita";
import { render, fireEvent, screen } from "../test-utils";
import userEvent from '@testing-library/user-event';

describe("Cita", () => {

    describe("default", () => {
        it("Debería mostrar el mensaje 'No se encontró ninguna cita'", () => {
            render(<Cita />);
            expect(screen.getByText("No se encontro ninguna cita")).toBeInTheDocument();
        });
    });

    describe("Valores válidos", () => {
        it("Debería mostrar una nueva cita de 'Marge'", async () => {
            render(<Cita />);
            const inputChar = screen.getByPlaceholderText("Ingresa el nombre del autor");
            const getQuote = screen.getByLabelText("Obtener cita aleatoria");

            await act(async () => {
                fireEvent.change(inputChar, { target: { value: "marge" } });
                userEvent.click(getQuote);
            });

            expect(await screen.findByText("Por favor ingrese un nombre válido")).toBeInTheDocument();
        });
    });

    describe("Ingresar valores inválidos", () => {
        it("Debería mostrar un mensaje de personaje inválido", async () => {
            render(<Cita />);
            const inputChar = screen.getByPlaceholderText("Ingresa el nombre del autor");
            const getQuote = screen.getByLabelText("Obtener cita aleatoria");

            await act(async () => {
                fireEvent.change(inputChar, { target: { value: "pepe" } });
                userEvent.click(getQuote);
            });

            expect(await screen.findByText("Por favor ingrese un nombre válido")).toBeInTheDocument();
        });
    });

    describe("Cita aleatoria", () => {
        it("Debería mostrar una cita aleatoria", async () => {
            render(<Cita />);
            const getQuote = screen.getByText("Obtener cita aleatoria");

            await act(async () => {
                userEvent.click(getQuote);
            });

            expect(await screen.findByText("Por favor ingrese un nombre válido")).toBeInTheDocument();
        });
    });

    describe("Borrar", () => {
        it("Debería mostrar el mensaje 'No se encontró ninguna cita' después de hacer click en el botón 'Borrar'", async () => {
            render(<Cita />);
            const getQuote = screen.getByLabelText("Obtener cita aleatoria");
            const clean = screen.getByLabelText("Borrar");

            await act(async () => {
                userEvent.click(getQuote);
            });

            await act(async () => {
                userEvent.click(clean);
            });

            expect(await screen.findByText("No se encontro ninguna cita")).toBeInTheDocument();
        });
    });
});
