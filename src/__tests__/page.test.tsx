import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import Home from '@/app/page'

describe(Home, () => {
    it("chat button has correct href (/chat)", () => {
        render(<Home />)

        const buttonHref = screen.getByTestId("chat-page-button").getAttribute("href")

        expect(buttonHref).toEqual("/chat")
    })

    it("initial count is 0", () => {
        render(<Home />)

        const countElement = String(screen.getByTestId("count-element").textContent)

        expect(countElement).toBe("0")
    })

    it("increment button adds 1 to count", () => {
        render(<Home />)

        const incrementButton = screen.getByRole("button", { name: "+1" })
        fireEvent.click(incrementButton)

        const countElement = String(screen.getByTestId("count-element").textContent)

        expect(countElement).toBe("1")
    })

    it("decrement button removes 1 from count", () => {
        render(<Home />)

        const decrementButton = screen.getByRole("button", { name: "-1" })
        fireEvent.click(decrementButton)

        const countElement = String(screen.getByTestId("count-element").textContent)

        expect(countElement).toBe("-1")
    })
})