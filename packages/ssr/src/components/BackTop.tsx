export default () => {
    const scrollTop = () => {
        window.scroll(0,0)
        // window.scrollTo({
        //     top: 0,
        //     behavior: 'smooth'
        // })
    }

    return () => {
        return <div class="btn-top active" onclick={scrollTop}>↑</div>
    }
}


