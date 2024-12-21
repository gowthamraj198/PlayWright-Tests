import {Pet} from "../model/request_response";

export const pet = new Pet(
    164,
    { id: 1, name: "string" },
    "doggie",
    ["string"],
    [{ id: 0, name: "string" }],
    "available"
);

export const pet1 = new Pet(
    168,
    { id: 1, name: "string" },
    "cat",
    ["string"],
    [{ id: 0, name: "string" }],
    "available"
);

export const createData = {pet, pet1}
