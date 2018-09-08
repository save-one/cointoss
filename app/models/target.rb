class Target < ApplicationRecord
	has_one :note_target, :dependent => :destroy
	has_many :target_elements, :dependent => :destroy
end
