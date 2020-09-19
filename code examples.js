// Clear All 
Socket.emit('backend', {
    type: "exec", 
    value: `DB.rmv.user({
        type: 'All', 
        value: 'Admin in DevAuthors'
    })`
});