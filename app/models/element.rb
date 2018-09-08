class Element < ApplicationRecord
	has_one :target_element, :dependent => :destroy
end
