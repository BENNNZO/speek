import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

describe(Home, () => {
    it("chat button has correct href (/chat)", () => {
        render(<Home />)

        const buttonHref = screen.getByTestId("chat-page-button").getAttribute("href")

        expect(buttonHref).toEqual("/chat")
    })
})