class CreateNoteTargets < ActiveRecord::Migration[5.1]
  def change
    create_table :note_targets do |t|
      t.references :note, foreign_key: true
      t.references :target, foreign_key: true

      t.timestamps
    end
  end
end
