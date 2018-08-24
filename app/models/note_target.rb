class NoteTarget < ApplicationRecord
  belongs_to :note
  belongs_to :target
end
