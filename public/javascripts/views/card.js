CardEditTemplate = {

    text : "<div id='taskModal'><form action='#' method='post' name='f' id='cardForm'>" +
            "<p><b>Bold</b> fields are required. <u>U</u>nderlined letters are accesskeys.</p>" +
            "<fieldset>" +
            "<legend>Main Information</legend>" +
            "	<label for='story' accesskey='f'>Story: </label>" +
            "		<input type='text' id='story' name='story' tabindex='1' value='' title='story'/><br> " +
            "	<label for='title' accesskey='f'>Title: </label>" +
            "		<input type='text' id='title' name='title' tabindex='2' value='' title='title'/><br> " +
            "	<label for='points' accesskey='l'>Points: </label>" +
            "		<input type='text' id='points' name='points' tabindex='3' title='points'/><br> " +
            "	<label for='developer' class='required' accesskey='e'>Developer: </label> " +
            "		<input type='text' id='developer' name='developer' tabindex='4' title='developer'/><br>  " +
            "		<small>You can put more than one developer</small>" +
            "</fieldset>" +
            "<fieldset>" +
            "<legend>Secondary Information</legend> " +
            "<label for='description' accesskey='c'>Description: </label>   " +
            "	<textarea name='description' rows='3' cols='23' id='description' tabindex='5' title='description'></textarea><br>" +
            "<label for='kludge'></label> " +
            "	<input type='button' value='Send' id='taskSubmit' tabindex='6'/> <input type='reset' id='reset' tabindex='6' value='Clear'/> " +
            "</fieldset> " +
            "</form></div>"

}
Card = Backbone.View.extend({

    template:CardEditTemplate,

    initEvents:function() {
        $("#taskSubmit").bind("click", {self:this}, this.createTaskFromFormAndSave);
    },

    removeModal: function(model, response) {
        $("#taskModal").dialog('close');
    },

    columnId:{},

    createTaskFromFormAndSave:function(event) {
        var task = new Task($("#cardForm").serializeObject());
        task.set({status:event.data.self.columnId}, {silent:true})
        task.save({},{success:event.data.self.removeModal});
    },

    renderForEdit:function(columnId) {
        $("#" + columnId).append(this.template.text);
        this.columnId = columnId;
        $("#taskModal").dialog({modal:true,title:"New Task", width: 600 });
        this.initEvents();
    }

})