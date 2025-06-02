# System prompt for the agent
from ..agents.cv_tools import (
    ParseCVTool,
)

from ..routes.upload_status import set_status
from ..services.file_utils import TempFile  

class CVProcessingAgent:
    def process(self, file: TempFile, job_id: str) -> None:
        tool_input = {
            "file_path": file.get_full_path(),
            "file_name": file.get_file_name()
        }

        next_tool = ParseCVTool()  # Start with the first tool

        job_status = {"message": f"Extracting text ({file.get_file_name()})", "percentage": 20}
        while next_tool:
            if tool_input is None:
                tool_input = {}

            next_tool.file = file

            result = next_tool.run(tool_input)
            
            next_tool = result.get("next_tool") if isinstance(result, dict) else None

            tool_input = result.get("tool_input") if isinstance(result.get("tool_input"), dict) else None
            job_status = result.get("job_status")

            if job_status is not None:
                percentage = job_status.get("percentage")
                set_status(job_id, f"{job_status.get('message')} ({file.get_file_name()})", percentage if percentage is not None else 0)
            else:
                set_status(job_id, f"Processing ({file.get_file_name()})", 0)

    pass
