export default ({ redirect }: { redirect: any }) => {
    window.onunhandledrejection = (event: PromiseRejectionEvent) => {
        console.log("Logged in window.onunhandledrejection", event);
        redirect('/error');
    };
}