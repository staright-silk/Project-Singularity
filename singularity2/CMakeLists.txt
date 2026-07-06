cmake_minimum_required(VERSION 3.20)
project(SingularityVulkan LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# ---------------------------------------------------------------------------
# Vulkan SDK (must be installed on your system: on CachyOS/Arch this is
#   sudo pacman -S vulkan-devel vulkan-tools shaderc
# shaderc gives us glslc for compiling GLSL -> SPIR-V.)
# ---------------------------------------------------------------------------
find_package(Vulkan REQUIRED)

# ---------------------------------------------------------------------------
# Dependencies fetched at configure time (no manual install needed)
# ---------------------------------------------------------------------------
include(FetchContent)

FetchContent_Declare(
    glfw
    GIT_REPOSITORY https://github.com/glfw/glfw.git
    GIT_TAG        3.4
)
set(GLFW_BUILD_DOCS OFF CACHE BOOL "" FORCE)
set(GLFW_BUILD_TESTS OFF CACHE BOOL "" FORCE)
set(GLFW_BUILD_EXAMPLES OFF CACHE BOOL "" FORCE)

FetchContent_Declare(
    vk-bootstrap
    GIT_REPOSITORY https://github.com/charles-lunarg/vk-bootstrap.git
    GIT_TAG        v1.3.301
)

FetchContent_Declare(
    glm
    GIT_REPOSITORY https://github.com/g-truc/glm.git
    GIT_TAG        1.0.1
)

FetchContent_MakeAvailable(glfw vk-bootstrap glm)

# ---------------------------------------------------------------------------
# Shader compilation (GLSL -> SPIR-V)
# ---------------------------------------------------------------------------
find_program(GLSLC_EXECUTABLE NAMES glslc
    HINTS "$ENV{VULKAN_SDK}/bin" "/usr/bin" "/usr/local/bin")

if(NOT GLSLC_EXECUTABLE)
    message(FATAL_ERROR "glslc not found. Install the Vulkan SDK / shaderc package.")
endif()

set(SHADER_NAMES raymarch bloom)
set(SHADER_OUTPUTS "")
foreach(SHADER_NAME ${SHADER_NAMES})
    set(SHADER_SRC ${CMAKE_SOURCE_DIR}/shaders/${SHADER_NAME}.comp)
    set(SHADER_SPV ${CMAKE_BINARY_DIR}/shaders/${SHADER_NAME}.comp.spv)
    add_custom_command(
        OUTPUT ${SHADER_SPV}
        COMMAND ${CMAKE_COMMAND} -E make_directory ${CMAKE_BINARY_DIR}/shaders
        COMMAND ${GLSLC_EXECUTABLE} ${SHADER_SRC} -o ${SHADER_SPV}
        DEPENDS ${SHADER_SRC}
        COMMENT "Compiling ${SHADER_NAME}.comp -> SPIR-V"
    )
    list(APPEND SHADER_OUTPUTS ${SHADER_SPV})
endforeach()
add_custom_target(shaders ALL DEPENDS ${SHADER_OUTPUTS})

# ---------------------------------------------------------------------------
# Executable
# ---------------------------------------------------------------------------
add_executable(singularity_vk src/main.cpp)
add_dependencies(singularity_vk shaders)

target_link_libraries(singularity_vk PRIVATE
    Vulkan::Vulkan
    glfw
    vk-bootstrap::vk-bootstrap
    glm::glm
)

target_compile_definitions(singularity_vk PRIVATE
    SHADER_DIR="${CMAKE_BINARY_DIR}/shaders/"
)
