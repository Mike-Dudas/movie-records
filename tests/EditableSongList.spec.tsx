import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EditableSongList } from "../src/components/EditableSongList";

describe("EditableSongList", () => {
    test("adds a blank song", () => {
        const setSongs = jest.fn();

        render(<EditableSongList songs={[]} setSongs={setSongs} />);

        userEvent.click(screen.getByRole("button", { name: /add song/i }));

        expect(setSongs).toHaveBeenCalledWith([""]);
    });

    test("edits an existing song id", () => {
        const setSongs = jest.fn();

        render(<EditableSongList songs={["old-id"]} setSongs={setSongs} />);

        const input = screen.getByDisplayValue("old-id");
        fireEvent.change(input, { target: { value: "new-id" } });

        expect(setSongs).toHaveBeenCalledWith(["new-id"]);
    });

    test("deletes a song", () => {
        const setSongs = jest.fn();

        render(
            <EditableSongList
                songs={["song-one", "song-two"]}
                setSongs={setSongs}
            />,
        );

        const buttons = screen.getAllByRole("button");
        userEvent.click(buttons[1]);

        expect(setSongs).toHaveBeenCalledWith(["song-two"]);
    });
});
