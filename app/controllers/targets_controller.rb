class TargetsController < ApplicationController

	def create
	end

	def update
		target = Target.find(params[:id])
		target.update(target_params)
	end

	def destroy
	end

	private

	def target_params
		params.require(:target).permit(:name)
	end
end
