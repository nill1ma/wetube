import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import VideosArea from '.';
import ThemeContext from '../../context';
import { shallow } from "../../test-setup";
// const mockDispatchfn = jest.fn(() => new Promise(resolve => resolve('')));
// const mockDispatchfn = jest.fn();

describe('Testing home component', () => {
    const theme = {
        name: '',
        section: '',
        sideBar: '',
        font: '',
        iconAreaActive: '',
        iconAreaUnactive: '',
        unactiveIcon: '',
        activeIcon: ''
    }
    beforeEach(() => {

        // expect(wrapper.find(LandingPage)).toHaveLength(0);
        // expect(wrapper.find(NotFoundPage)).toHaveLength(1);
    })
    describe('First one', () => {

        it('Check logo', async () => {
            var { getByTestId } = await shallow(
                <ThemeContext.Provider value={theme}>
                    <MemoryRouter initialEntries={['/favorites']}>
                        <VideosArea />
                    </MemoryRouter>
                </ThemeContext.Provider >
            )

            // const input = getByTestId("input-field-research")
            // const button = getByTestId('button-research')
            // expect(input).toBe(getByPlaceholderText("Type a name of your preference"))
            // fireEvent.change(input, { target: { value: "React" } })
            // fireEvent.click(button)
            // expect(input.value).toBe("React")

        })
    })
})