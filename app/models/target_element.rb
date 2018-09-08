class TargetElement < ApplicationRecord
  belongs_to :target
  belongs_to :element, :dependent => :destroy
end
