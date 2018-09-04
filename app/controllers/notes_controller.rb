class NotesController < ApplicationController
  def index
  end

  def show
  	@note = Note.find(params[:id])
  	@targets =Target.joins(:note_targets).where(note_id: @note.id)
  end

  def create
  	note = Note.create(user_id: current_user.id)
  	target1 = Target.create
  	target2 = Target.create
  	note_target1 = NoteTarget.create(note_id: note.id, target_id: target1.id)
  	note_target2 = NoteTarget.create(note_id: note.id, target_id: target2.id)
  	redirect_to note_path(note)
  end

  def update
  end

  def destroy
  end
end
