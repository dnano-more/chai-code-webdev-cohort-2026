import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute('/contact')({
    component: RouterComponent,
})

function RouterComponent() {
    return <div>Hello I am from "/contact" page</div>
}