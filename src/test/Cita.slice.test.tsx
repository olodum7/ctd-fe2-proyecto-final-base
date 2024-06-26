import { EstadoCita } from "../features/quote/citaSlice";
import CitasReducer, { limpiar, obtenerCitaAsync } from "../features/quote/citaSlice";
import { ESTADO_FETCH } from "../features/quote/constants";
import { ICita } from "../features/quote/types";

describe("reducer", () => {

    const initialState: EstadoCita = {
        data: null,
        estado: ESTADO_FETCH.INACTIVO,
    };
    
    const cita : ICita = {
        cita: 'Inflammable means flammable? What a country!',
        personaje: 'Dr. Nick',
        imagen: 'https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FNickRiviera.png?1497567511084',
        direccionPersonaje: 'Right'
    };

    describe("Por defecto", () => {
        it("Debería devolver el estado inicial", () => {
            const actual = CitasReducer(initialState, { type: "any" });
            expect(actual).toEqual(initialState);            
        });
    });

    describe("Pendiente", () => {
        it("Debería mostrar el estado de carga", () => {
            const mockState: EstadoCita = {
                data: null,
                estado: ESTADO_FETCH.CARGANDO,
            };

            const actual = CitasReducer(mockState, obtenerCitaAsync.pending);
            expect(actual.estado).toEqual(ESTADO_FETCH.CARGANDO);
            expect(actual.data).toBeNull();           
        });
    });

    describe("Cita mostrada", () => {
        it("Debería devolver una cita", () => {
            const actual = CitasReducer(initialState, { type: obtenerCitaAsync.fulfilled.type, payload: cita });
            if (actual && actual.data) {
                expect(actual.data.personaje).toBe("Dr. Nick");
            }
        });
    });

    describe("Error de cita", () => {
        it("Debería devolver el estado de error", () => {
            const mockState: EstadoCita = {
                data: null,
                estado: ESTADO_FETCH.ERROR,
            };
            const actual = CitasReducer(mockState, obtenerCitaAsync.rejected);
            expect(actual.estado).toBe(ESTADO_FETCH.ERROR);
        });
    });

    describe("Borrar", () => {
        it("Debería devolver el estado inicial", () => {
            const mockState: EstadoCita = {
                data: cita,
                estado: ESTADO_FETCH.INACTIVO,
            };
            const actual = CitasReducer(mockState, limpiar);
            expect(actual.data).toBeNull();
        });
    });
});
