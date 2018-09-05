class NotesController < ApplicationController
  def index
  end

  def show
  	@note = Note.find(params[:id])
  	@targets = Target.find_by_sql("SELECT * FROM targets JOIN note_targets ON note_targets.target_id = targets.id WHERE note_targets.note_id = #{@note.id}")
  	# cannot @targets =Target.joins(:note_targets).where(note_targets: {note_id: @note.id})
  end

  def create
  	note = Note.create(user_id: current_user.id)
  	target1 = Target.create
  	target2 = Target.create
  	note_target1 = NoteTarget.create(note_id: note.id, target_id: target1.id)
  	note_target2 = NoteTarget.create(note_id: note.id, target_id: target2.id)
  	element1 = Element.create
  	element2 = Element.create
  	target_element1 = TargetElement.create(target_id: target1.id, element_id: element1.id)
  	target_element2 = TargetElement.create(target_id: target2.id, element_id: element2.id)
  	redirect_to note_path(note)
  end

  def update
  	note = Note.find(params[:id])
  	note.update(note_params)
  end

  def destroy
  end

  private

  def note_params
  	params.require(:note).permit(:title)
  end

end
