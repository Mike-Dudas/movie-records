import { fireEvent, render, screen } from "@testing-library/react";
import { SoundtrackEditor } from "../src/components/SoundtrackEditor";

describe("SoundtrackEditor", () => {
    const songs = [
        { id: "1", name: "Old Song", by: "Old Artist" },
        { id: "2", name: "Other Song", by: "Other Artist" },
    ];

    test("edits a song name", () => {
        const setSongs = jest.fn();

        render(<SoundtrackEditor songs={songs} setSongs={setSongs} />);

        const input = screen.getByDisplayValue("Old Song");
        fireEvent.change(input, { target: { value: "New Song" } });

        expect(setSongs).toHaveBeenCalledWith([
            { id: "1", name: "New Song", by: "Old Artist" },
            { id: "2", name: "Other Song", by: "Other Artist" },
        ]);
    });

    test("edits a song artist", () => {
        const setSongs = jest.fn();

        render(<SoundtrackEditor songs={songs} setSongs={setSongs} />);

        const input = screen.getByDisplayValue("Old Artist");
        fireEvent.change(input, { target: { value: "New Artist" } });

        expect(setSongs).toHaveBeenCalledWith([
            { id: "1", name: "Old Song", by: "New Artist" },
            { id: "2", name: "Other Song", by: "Other Artist" },
        ]);
    });
});
